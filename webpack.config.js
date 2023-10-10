const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
  entry: ["./index.js", "./styles.scss"], // Входной файл, в котором мы пишем свой код
  mode,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
  },
  devtool: process.env.NODE_ENV === "production" ? false : "source-map",
  output: {
    filename: "index.js", // Выходной файл, который подключаем к HTML, сохранится он по пути "./dist/index.js"
    path: path.resolve(__dirname, "dist"),
    scriptType: "text/javascript",
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "assets", to: "static" }],
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
  experiments: {
    outputModule: true,
  },
};
