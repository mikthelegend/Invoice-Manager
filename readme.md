# Invoice Manager
This is a tool for generating standardised invoices in a quick and efficient manner. It works using a html DOM to layout the relevant information neatly, then converts that DOM to a PDF. 

## Installation
To install this application you will need to:
1. First, clone this repository to your machine.
2. Then, you can run `npm install` to gather all the necessary dependencies.
3. Finally, run `npm run make` to generate the application at the location `./out/Invoice Manager-platform`. Now you can run that application to access the program.

## Usage
Upon opening the application, you will be greeted with the main menu:

![Main Menu](https://github.com/mikthelegend/Invoice-Manager/blob/main/example_images/main_menu.png?raw=true "Main Menu")

### Your Details & Client Details
The first two columns of the interface work in much the same way. You will find a dropdown at the top of each of them which will initially contain nothing. To use, simply enter the relevant information and generate an invoice. After the invoice is generated, the dropdowns will update to contain the information you entered, making future use very streamline.

> Note: There is currently no in-app functionality to edit or remove this stored information. Should you need to change or remove details, navigate to the applications storage (located in `/Users/yourname/Library/Application Support/Invoice Manager` on MacOS) and modify `user_config.json`.

### Invoice Details
In a similar way to personal and client details, the invoice details update automatically with use. 

Starting at 1, the invoice number will increment itself with each invoice generation. Should you need to generate an invoice with a specific invoice number (e.g: to correct a mistake), just modify this field to contain the desired number.

The invoice date and due dates reference your computer's internal clock to obtain the current date, and the date 1 week from today. If you need a more specific date, these fields are also able to be modified.

### Invoice Items
The next section is invoice items, which contains rows each corresponding to one billable item. These rows can be added and removed with the `Add Item` and `Remove Item` buttons, located below the last row, and each can be modified to contain a  different name, description, and price.

> Note: While the price field can accept non-numeric values, this will not be compatible with the app's price-totaling functionality. Do not enter non-numeric values or symbols (no dollar-signs ($), commas (,), hyphens (-), etc...)

You will also notice the `Save Item` and `Erase Item` buttons below, as well as a `Preset` dropdown at the beginning of each row. These elements allow you to store and recall presets for billable items you may use frequently. To use, simply enter the information you'd like stored into the bottom-most row, press `Save Item`, enter a preset name, and press `Ok`. Your new preset will now be visible in the `Preset` dropdown, under the given preset name for ease of access. You can similarly erase a preset by clicking `Erase Item` and entering the name of the preset you'd like to remove.

### Payment Details
Finally we have the payment details. These are the bank details for the account in which you'd like the client to transfer payment. Along with the users & client details from the first section, the bank details are also stored for ease of use, and are recalled on a per-sender basis. This means that if you have multiple senders stored in the first column of the first section, changing between them using the drop-down will also auto-fill the payment details section.

### Generation
Once all the details for the invoice have been entered, we can generate. Pressing the `Generate Invoice` button will open a file dialog for you to choose the save location:


![Main Menu](https://github.com/mikthelegend/Invoice-Manager/blob/main/example_images/file_dialog.png?raw=true "Main Menu")

If you have saved an invoice before, this will open at the last used save location for streamlined use.

After selecting a save location the invoice will be generated and you will be prompted to open the invoice's enclosing folder so you can easily check on the result, attach it to an email, and/or print it. Below is an example generation, including a before and after state:


![Main Menu](https://github.com/mikthelegend/Invoice-Manager/blob/main/example_images/filled_menu.png?raw=true "Main Menu")

![Main Menu](https://github.com/mikthelegend/Invoice-Manager/blob/main/example_images/example_invoice.png?raw=true "Main Menu")

## Additional Information

If you are in need of additional support using this app, or would like to contact me about fixes and features. Feel free to reach out at this address: `mikail.j.y@gmail.com`

It's worth stressing that this project began as a solution to my own day-to-day struggles, and was built with my own specific use-case in mind. There is little to no ongoing maintenance for this project, barring whenever I run into a bug that bothers me enough to warrant fixing. That being said, I'm not opposed to improving the app should I receive the request to. 
