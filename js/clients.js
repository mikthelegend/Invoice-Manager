
function fill_client_details(client_details) {
    if (!client_details) return;

    let name_inp = document.getElementById("client_name");
    name_inp.value = client_details.name;

    let addr1_inp = document.getElementById("client_addr1");
    addr1_inp.value = client_details.addr1;

    let addr2_inp = document.getElementById("client_addr2");
    addr2_inp.value = client_details.addr2;

    let country_inp = document.getElementById("client_country");
    country_inp.value = client_details.country;
}

function fill_client_selector() {
    let data = get_data();

    if (!data.clients) return;

    let client_selector = document.getElementById("client_selector");
    data.clients.forEach(client => {
        client_selector.innerHTML += "<option value=\"" + client.name + "\">" + client.name + "</option>";
    });
}

function extract_client_details() {
    let client_details = {};

    let name_inp = document.getElementById("client_name");
    client_details.name = name_inp.value;

    let addr1_inp = document.getElementById("client_addr1");
    client_details.addr1 = addr1_inp.value; 

    let addr2_inp = document.getElementById("client_addr2");
    client_details.addr2 = addr2_inp.value;

    let country_inp = document.getElementById("client_country");
    client_details.country = country_inp.value;

    return client_details;
}

function get_client_details(client_name) {
    let data = get_data();

    let client = data.clients.find(c => c.name == client_name);

    return client;
}
