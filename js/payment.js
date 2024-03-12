
function fill_payment_details() {
    let data = get_data();

    if (!data.payment_details) return;

    let bsb_inp = document.getElementById("bsb");
    bsb_inp.value = data.payment_details.bsb;

    let acc_inp = document.getElementById("acc");
    acc_inp.value = data.payment_details.account_number;

    let msg_inp = document.getElementById("msg");
    msg_inp.value = data.payment_details.message;
}

function extract_payment_details() {
    let payment_details = {};

    let bsb_inp = document.getElementById("bsb");
    payment_details.bsb = bsb_inp.value;

    let acc_inp = document.getElementById("acc");
    payment_details.account_number = acc_inp.value;

    let msg_inp = document.getElementById("msg");
    payment_details.message = msg_inp.value;
    
    return payment_details;
}
