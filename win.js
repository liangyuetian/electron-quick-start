const { app, BrowserWindow, Menu } = require('electron')

let win
function createWindow() {
    Menu.setApplicationMenu(null)
    win = new BrowserWindow({ width: 1255, height: 600 })
    win.setProgressBar(0.5);
    // win.loadFile('dist/index.html')
    // mainWindow.loadURL(`file://${__dirname}/index.html`);
    win.loadURL('http://localhost:7001')

    win.on('closed', function () {
        win = null
    })
}


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (win === null) {
        createWindow()
    }
})
module.exports = {
    win,
    ready(fn) {
        app.on('ready', createWindow);
        fn && fn(win);
    }
}
// export default {
//     win,
//     ready(fn) {
//         app.on('ready', createWindow);
//         fn && fn(win);
//     }
// }