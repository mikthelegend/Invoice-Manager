
function fill_personal_detials() {
    let data = get_data();

    if (!data.personal_details) return;

    let name_inp = document.getElementById("your_name");
    name_inp.value = data.personal_details.name;

    let abn_inp = document.getElementById("your_abn");
    abn_inp.value = data.personal_details.abn;

    let addr1_inp = document.getElementById("your_addr1");
    addr1_inp.value = data.personal_details.addr1;

    let addr2_inp = document.getElementById("your_addr2");
    addr2_inp.value = data.personal_details.addr2;

    let country_inp = document.getElementById("your_country");
    country_inp.value = data.personal_details.country;
}

function extract_personal_details() {
    personal_details = {};

    let name_inp = document.getElementById("your_name");
    personal_details.name = name_inp.value;

    let abn_inp = document.getElementById("your_abn");
    personal_details.abn = abn_inp.value;

    let addr1_inp = document.getElementById("your_addr1");
    personal_details.addr1 = addr1_inp.value; 

    let addr2_inp = document.getElementById("your_addr2");
    personal_details.addr2 = addr2_inp.value;

    let country_inp = document.getElementById("your_country");
    personal_details.country = country_inp.value;

    return personal_details;
}