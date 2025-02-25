
function fill_sender_detials(sender_details) {
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
    sender_details = {};

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

    return sender_details;
}