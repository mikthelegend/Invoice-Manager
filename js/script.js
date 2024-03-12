const { ipcRenderer } = require("electron");

const template_path = path.resolve(__dirname, 'template.html');

function init() {
    let run_button = document.getElementById("run");
    run_button.addEventListener('click', run);

    let add_item_button = document.getElementById("add_item");
    add_item_button.addEventListener('click', add_item);

    let rem_item_button = document.getElementById("rem_item");
    rem_item_button.addEventListener('click', rem_item);

    let save_item_button = document.getElementById("save_item");
    save_item_button.addEventListener('click', () => {
        prompt("Preset Name:", (response) => {
            let item = document.getElementById("item_list").lastElementChild.previousElementSibling
            let item_details = extract_item_details(item.id);
            save_item_preset(response, item_details);
        })
    });

    let del_item_button = document.getElementById("del_item");
    del_item_button.addEventListener('click', () => {
        prompt("Preset to delete:", (response) => {
            console.log(response);
            erase_item_preset(response);
        })
    });

    let client_selector = document.getElementById("client_selector");
    client_selector.addEventListener("change", () => {
        let selected_client = client_selector.value;
        let client_details = get_client_details(selected_client);
        fill_client_details(client_details);
    });
}

init();

fill_personal_detials();
fill_client_selector();
fill_invoice_details();
fill_payment_details();
fill_item_selector("item1");

async function run() {
    // Extract details from document.
    let personal_details = extract_personal_details();
    let client_details = extract_client_details();
    let invoice_details = extract_invoice_details();
    let items = extract_items();
    let payment_details = extract_payment_details();
    
    // Update all changed details.
    let data = get_data();

    // Update user details.
    data.personal_details = personal_details;

    // Update client details.
    if (client_details.name != "") {
        let existing_client = data.clients.find(c => c.name == client_details.name);
        if (existing_client) {
            existing_client = client_details;
        } else {
            data.clients.push(client_details);
        }
    }

    // Update payment details.
    data.payment_details = payment_details;

    set_data(data);

    let dom = generate_invoice_dom(
        personal_details, 
        client_details, 
        invoice_details,
        items,
        payment_details
    );

    let filename = "inv" + invoice_details.inv_number.padStart(5, '0') + ".pdf";
    
    let save_path = await ipcRenderer.invoke("openDialog", "Where would you like to save invoice?");

    if (save_path) {
        dom_to_pdf(dom, filename, save_path[0]);
        popup(`Invoice saved at ${save_path[0]}`, () => {
            ipcRenderer.invoke("showInFinder", path.join(save_path[0], filename));
        });

        update_inv_number();
    }

}

function generate_invoice_dom(personal_details, client_details, invoice_details, items, payment_details) {
    let template = new DOMParser().parseFromString(fs.readFileSync(template_path), "text/html");

    // Personal Details
    template.getElementById("userName").innerText = personal_details.name;
    template.getElementById("userABN").innerText = personal_details.abn;
    template.getElementById("userAddress1").innerText = personal_details.addr1;
    template.getElementById("userAddress2").innerText = personal_details.addr2;
    template.getElementById("userCountry").innerText = personal_details.country;

    // Client Details
    template.getElementById("clientName").innerText = client_details.name;
    template.getElementById("clientAddress1").innerText = client_details.addr1;
    template.getElementById("clientAddress2").innerText = client_details.addr2;
    template.getElementById("clientCountry").innerText = client_details.country;

    // Invoice Details
    template.getElementById("invoiceNumber").innerText += invoice_details.inv_number.padStart(5, '0');
    template.getElementById("invoiceDate").innerText += invoice_details.inv_date;
    template.getElementById("dueDate").innerText += invoice_details.due_date;

    // Items
    let labels_div = template.getElementById("labels")
    let total_div = template.getElementById("total");
    let total_price = 0;

    let AUDollar = new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
    });

    items.forEach(item => {
        let new_item = labels_div.cloneNode(true);

        new_item.id = "";
        new_item.children[0].innerText = item.name;
        new_item.children[1].innerText = item.description;
        new_item.children[2].innerText = AUDollar.format(item.price);

        total_div.before(new_item);
        total_price += Number(item.price);
    })

    template.getElementById("totalPrice").innerText = AUDollar.format(total_price);

    // Payment Details
    template.getElementById("BSB").innerText += payment_details.bsb;
    template.getElementById("ACC").innerText += payment_details.account_number;
    template.getElementById("note").innerText += payment_details.message;

    return template;
}

