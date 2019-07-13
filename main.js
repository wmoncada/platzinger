// Archivo de app electron
// https://coursetro.com/posts/code/125/Angular-5-Electron-Tutorial
// https://github.com/electron-userland/electron-packager
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/platzinger/index.html'),
    protocol: 'file:',
    slashes: true
  }));
  // libero memoria de OS al cerrar la ventana
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // process.platform windows: Win32, Mac: darwin
  if (process.platform !== 'darwin') {
    app.quit(); // cierra toda la aplicacion
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
