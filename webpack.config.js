const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const fs = require('fs');

const pagesDir = path.resolve(__dirname, 'src/pages');

const pages = fs.readdirSync(pagesDir).filter(file => file.endsWith('.html'));

module.exports = {
  entry: './src/index.js', 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    
    new CleanWebpackPlugin(),

    ...pages.map(page => new HtmlWebpackPlugin({
      filename: page, 
      template: path.resolve(pagesDir, page), 
    }))
  ],
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', 
        },
      },
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, 
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, 
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'), 
    },
    port: 9000,
    open: true, 
    hot: true, 
  },
  mode: 'development', 
};
