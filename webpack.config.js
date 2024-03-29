	const path = require('path');

	const HtmlWebpackPlugin = require('html-webpack-plugin');
	const MiniCssExtractPlugin = require("mini-css-extract-plugin");

	module.exports = (env) => {
		return {
			mode: env.mode ?? 'development',
			entry: path.resolve(__dirname, 'src', 'index.js'),
			output: {
				filename: 'bundle.js',
				path: path.resolve(__dirname, 'dist'),
				clean: true,
			},
			plugins: [
				new HtmlWebpackPlugin({
					template: path.resolve(__dirname, 'src', 'index.html'),
				}),
				new MiniCssExtractPlugin({
					filename: 'style.css',
				}),
			],
			module: {
				rules: [
					{
						test: /\.css$/i,
						use: [MiniCssExtractPlugin.loader, "css-loader"],
					},
				],
			},
			devServer: {
				port: 5000,
				open: true,
			},
		}
	};