const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/data.js",
    "./js/backend.js",
    "./js/debounce.js",
    "./js/card.js",
    "./js/pin.js",
    "./js/form.js",
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
