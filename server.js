import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config.development';

const compiler = webpack(config);
const app = express();

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}));

app.use(webpackHotMiddleware(compiler));

app.listen(9000);


// 
// var electron = require('electron')
// var app = electron.app;
// var BrowserWindow = electron.BrowserWindow;
//
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit();
// });
//
// app.on('ready', () => {
//   mainWindow = new BrowserWindow({
//     width: 1366,
//     height: 768,
//     defaultEncoding: 'UTF-8'
// });
//
//   mainWindow.loadURL(`file://${__dirname}/public/index.html`);
//
//   // mainWindow.openDevTools();
//
//   mainWindow.on('closed', () => {
//     mainWindow = null;
//   });
// })
