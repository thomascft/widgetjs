const { app, BrowserWindow } = require('electron');
const path = require('path');
const config = require(path.join(app.getPath("userData"), "config.json"));

const createWidgets = () => {
    for (let i in config.widgets) {
	const widget = config.widgets[i];
	const widgetPath = path.join(app.getPath("userData"), "/widgets/", widget);
	const widgetConfig = require(path.join(widgetPath, "manifest.json"));
	const widgetWindow = new BrowserWindow({
	    width: widgetConfig.window.geometry.width,
	    height: widgetConfig.window.geometry.height,
	});
	widgetWindow.loadFile(path.join(widgetPath, widgetConfig.main));

    }
}

if (require('electron-squirrel-startup')) {
    app.quit();
}

app.on('ready', createWidgets);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWidgets();
  }
});
