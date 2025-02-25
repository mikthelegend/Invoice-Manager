
function fill_sender_details(sender_details) {
    if (!sender_details) return;

    let name_inp = document.getElementById("sender_name");
    name_inp.value = sender_details.name;

    let abn_inp = document.getElementById("sender_abn");
    abn_inp.value = sender_details.abn;

    let addr1_inp = document.getElementById("sender_addr1");
    addr1_inp.value = sender_details.addr1;

    let addr2_inp = document.getElementById("sender_addr2");
    addr2_inp.value = sender_details.addr2;

    let country_inp = document.getElementById("sender_country");
    country_inp.value = sender_details.country;

    // Payment details
    let payment_details = sender_details.payment_details

    let bsb_inp = document.getElementById("bsb");
    bsb_inp.value = payment_details.bsb;

    let acc_inp = document.getElementById("acc");
    acc_inp.value = payment_details.account_number;

    let msg_inp = document.getElementById("msg");
    msg_inp.value = payment_details.message;
}

function fill_sender_selector() {
    let data = get_data();

    if (!data.senders) return;

    let sender_selector = document.getElementById("sender_selector");
    data.senders.forEach(sender => {
        sender_selector.innerHTML += "<option value=\"" + sender.name + "\">" + sender.name + "</option>";
    });
}

function extract_sender_details() {
    let sender_details = {};

    let name_inp = document.getElementById("sender_name");
    sender_details.name = name_inp.value;

    let abn_inp = document.getElementById("sender_abn");
    sender_details.abn = abn_inp.value;

    let addr1_inp = document.getElementById("sender_addr1");
    sender_details.addr1 = addr1_inp.value; 

    let addr2_inp = document.getElementById("sender_addr2");
    sender_details.addr2 = addr2_inp.value;

    let country_inp = document.getElementById("sender_country");
    sender_details.country = country_inp.value;

    // Payment Details
    let payment_details = {};

    let bsb_inp = document.getElementById("bsb");
    payment_details.bsb = bsb_inp.value;

    let acc_inp = document.getElementById("acc");
    payment_details.account_number = acc_inp.value;

    let msg_inp = document.getElementById("msg");
    payment_details.message = msg_inp.value;

    sender_details.payment_details = payment_details;

    return sender_details;
}

function get_sender_details(sender_name) {
    let data = get_data();

    let sender = data.senders.find(s => s.name == sender_name);

    return sender;
}
