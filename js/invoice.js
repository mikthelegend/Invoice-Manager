
function fill_invoice_details() {
    let data = get_data();

    if (!data.invoice_number) data.invoice_number = 0;

    let today = new Date();
    let next_week = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

    document.getElementById("inv_num").value = data.invoice_number;
    document.getElementById("inv_date").value = today.toLocaleDateString('en-GB');
    document.getElementById("due_date").value = next_week.toLocaleDateString('en-GB');
}

function extract_invoice_details() {
    let invoice_details = {};

    let num_inp = document.getElementById("inv_num");
    invoice_details.inv_number = num_inp.value;

    let date_inp = document.getElementById("inv_date");
    invoice_details.inv_date = date_inp.value;

    let due_inp = document.getElementById("due_date");
    invoice_details.due_date = due_inp.value;

    return invoice_details;
}

function update_inv_number() {
    let data = get_data();

    data.invoice_number = Number(document.getElementById("inv_num").value) + 1;

    set_data(data);
    fill_invoice_details();
}