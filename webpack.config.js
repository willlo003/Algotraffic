const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/client/main.ts",
  devtool: "eval-source-map",
  output: {
    publicPath: "/public/",
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  devServer: {
    host: "0.0.0.0",
    compress: true,
    port: 8081,
    publicPath: "/public/",
    proxy: {
      "/": "http://localhost:3001/",
    },
  },
  module: {
    rules: [
      // ts-loader can convert TS (ES6) to JS (ES6), however,
      // babel/preset-typescript can replace it
      // convert JS (ES6) to JS (ES5)
      {
        test: /\.(ts|js)x?$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new VueLoaderPlugin()],
};
