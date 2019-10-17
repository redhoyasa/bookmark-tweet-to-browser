const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  watchOptions: {
		ignored: /node_modules/
	},
  entry: {
    content: path.join(__dirname, "src", "content.js"),
    background: path.join(__dirname, "src", "background.js"),
    styles: path.join(__dirname, "src", "css", "styles.css")
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new CleanWebpackPlugin({
			verbose: false,
		}),
    new MiniCssExtractPlugin({
			filename: 'css/[name].css'
    }),
    new WebpackShellPlugin({
			onBuildExit: [
				"rm ./dist/styles.js"
			]
		}),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      } 
    ]
  }
};
