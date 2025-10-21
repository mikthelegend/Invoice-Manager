const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron')

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 1600,
        height: 900,
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