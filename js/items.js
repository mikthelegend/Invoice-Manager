const EMPTY_ITEM = { name: "", description: "", price: "" }

function fill_item_details(item_id, item_details) {
    let item = document.getElementById(item_id);

    item.children[1].value = item_details.name;
    item.children[2].value = item_details.description;
    item.children[3].value = item_details.price;
}

function fill_item_selector(item_id) {
    let data = get_data();

    let item_selector = document.getElementById(item_id).children[0];
    item_selector.innerHTML = "<option></option>";

    data.items.forEach(item => {
        item_selector.innerHTML += "<option value=\"" + item.preset_name + "\">" + item.preset_name + "</option>";
    })

    item_selector.addEventListener('change', () => {
        let preset_name = item_selector.value;
        let item_details = get_item_details(preset_name);

        fill_item_details(item_id, item_details);
    })
}

function update_item_selectors() {
    let item_list = document.getElementById("item_list");
    for (let child of item_list.children) {
        if (child.children[0].tagName == "SELECT") {
            fill_item_selector(child.id);
        }
    }
}

function extract_items() {
    let item_list = Array.from(document.getElementById("item_list").children);

    let items = item_list.map(item => {
        return extract_item_details(item.id);
    });

    return items.slice(1, -1);
}

function extract_item_details(item_id) {
    let item_details = {};

    let item = document.getElementById(item_id);

    if (item) {
        item_details.name = item.children[1].value;
        item_details.description = item.children[2].value;
        item_details.price = item.children[3].value;
    }

    return item_details;
}

function get_item_details(preset_name) {
    if (preset_name == "") return EMPTY_ITEM;

    let data = get_data();

    let item = data.items.find(i => i.preset_name == preset_name);

    return item;
}

function save_item_preset(preset_name, item_details) {
    let data = get_data();

    item_details.preset_name = preset_name;

    let existing_preset = data.items.find(i => i.preset_name == preset_name);
    if (existing_preset) {
        existing_preset = item_details;
    } else {
        data.items.push(item_details);
    }

    set_data(data);
    update_item_selectors();
}

function erase_item_preset(preset_name) {
    let data = get_data();

    data.items = data.items.filter(i => i.preset_name != preset_name);
    
    set_data(data);
    update_item_selectors();
}

function add_item() {
    let item_list = document.getElementById("item_list");
    let new_item = document.createElement("div");

    new_item.classList.add("inv_item");
    new_item.id = "item" + (item_list.childElementCount - 1);
    new_item.innerHTML = "<select></select><input><textarea></textarea><input>"
    
    document.getElementById("item_list").lastElementChild.insertAdjacentElement('beforebegin', new_item);

    fill_item_selector(new_item.id);
}

function rem_item() {
    if (document.getElementById("item_list").children.length == 3) return;
    document.getElementById("item_list").lastElementChild.previousElementSibling.remove();
}
