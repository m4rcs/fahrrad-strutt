const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 9000,
    watchContentBase: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  ],
  module: {
    rules: [{
      test: /\.(sa|sc|c)ss$/,
      use: [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
      ],
    }]
  }
};
