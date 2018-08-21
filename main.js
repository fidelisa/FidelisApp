
var electron = require('electron')
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    defaultEncoding: 'UTF-8'
});

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // mainWindow.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
})
