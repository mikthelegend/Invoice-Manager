const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron')

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true,
        }
    })

    win.loadFile('html/index.html');
}

ipcMain.handle("openDialog", (e, message) => {
    return dialog.showOpenDialogSync(win, { message, properties: ['openDirectory'] });
});

ipcMain.handle("showInFinder", (e, path) => {
    shell.showItemInFolder(path);
});


app.whenReady().then(() => {
    createWindow()
})