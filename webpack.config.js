const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  mode: devMode ? "development" : "production",
  entry: "./src/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "public/assets"),
    publicPath: "",
  },
  devServer: {
    compress: true,
    host: "0.0.0.0",
    port: 9000,
    static: [path.resolve(__dirname, "public")],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
     `...`,
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        loader: "file-loader",
        options: { name: "fonts/[name].[ext]" },
      },
    ],
  },
};
