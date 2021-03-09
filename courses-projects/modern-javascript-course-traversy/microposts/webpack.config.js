const path = require("path");

module.exports = {
  entry: {
    app: ["@babel/polyfill", "./src/app.js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.bundle.js",
  },
  module: {
    rules: [
      {
        // A regex that looks at all Javascript files
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        //this is where we define our presets
        query: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
};
