const { jsPDF } = require('jspdf');
const fs = require('fs');
const path = require('path');

const app_name = "Invoice Manager"
const user_config_filename = "user_config.json";
const app_style_path = path.resolve(__dirname, '..', 'css', 'style.css');
const inv_style_path = path.resolve(__dirname, '..', 'css', 'invoice.css');

const DEBUG = true;

function get_data() {
    let data = {};
    const appDatatDirPath = getAppDataPath();

    console.log(appDatatDirPath);

    // Create appDataDir if not exist
    if (!fs.existsSync(appDatatDirPath)) {
        fs.mkdirSync(appDatatDirPath);
    }
    
    const appDataFilePath = path.join(appDatatDirPath, user_config_filename);
    if (fs.existsSync(appDataFilePath)) {
        data = JSON.parse(fs.readFileSync(appDataFilePath, 'utf8'));
    } else {
        fs.writeFileSync(appDataFilePath, '{}');
    }
    return data;
}

function getAppDataPath() {
    if (DEBUG) return path.resolve(__dirname, '..');

    switch (process.platform) {
        case "darwin": {
            return path.join(process.env.HOME, "Library", "Application Support", app_name);
        }
        case "win32": {
            return path.join(process.env.APPDATA, app_name);
        }
        case "linux": {
            return path.join(process.env.HOME, "." + app_name);
        }
        default: {
            console.log("Unsupported platform!");
            process.exit(1);
        }
    }
}

function set_data(data) {
    const appDatatDirPath = getAppDataPath();

    // Create appDataDir if not exist
    if (!fs.existsSync(appDatatDirPath)) {
        fs.mkdirSync(appDatatDirPath);
    }

    const appDataFilePath = path.join(appDatatDirPath, user_config_filename);

    fs.writeFileSync(appDataFilePath, JSON.stringify(data));
}

function prompt(message, callback) {
    let popup = document.createElement("div");
    popup.id = "popup";

    let text = document.createElement("h2");
    text.innerText = message;
    popup.appendChild(text);

    let input = document.createElement("input");
    popup.appendChild(input);

    let ok_button = document.createElement("button");
    ok_button.innerText = "Ok";
    ok_button.addEventListener('click', () => {
        callback(input.value);
        popup.remove();
    });
    popup.appendChild(ok_button);

    let cancel_button = document.createElement("button");
    cancel_button.innerText = "Cancel";
    cancel_button.addEventListener('click', () => {
        popup.remove();
    });
    popup.appendChild(cancel_button);

    document.body.appendChild(popup);
}

function popup(message, callback) {
    let popup = document.createElement("div");
    popup.id = "popup";

    let text = document.createElement("h2");
    text.innerText = message;
    popup.appendChild(text);

    if (callback) {
        let ok_button = document.createElement("button");
        ok_button.innerText = "Open";
        ok_button.addEventListener('click', () => {
            callback();
            popup.remove();
        });
        popup.appendChild(ok_button);
    }

    let cancel_button = document.createElement("button");
    cancel_button.innerText = "Close";
    cancel_button.addEventListener('click', () => {
        popup.remove();
    });

    popup.appendChild(cancel_button);
    document.body.appendChild(popup);
}

function dom_to_pdf(dom, filename, save_path) {
    let style_link = document.getElementById("style");

    // Change style to match invoice styles.
    style_link.href = inv_style_path;

    let doc = new jsPDF('p', 'mm', 'a4');

    doc.html(dom.body, {
        callback: (doc) => {
            // Save the PDF
            if (!save_path) save_path = getAppDataPath();
            doc.save(path.join(save_path, filename));

            // Return to app styles
            style_link.href = app_style_path;
        },
        width: 210,
        windowWidth: 800
    });
}