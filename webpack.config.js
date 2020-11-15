const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/data.js",
    "./js/backend.js",
    "./js/helpers.js",
    "./js/preview.js",
    "./js/popup.js",
    "./js/pin.js",
    "./js/notice.js",
    "./js/map.js",
    "./js/main.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
