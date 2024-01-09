	const path = require('path');

	const HtmlWebpackPlugin = require('html-webpack-plugin');

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
					template: path.resolve(__dirname, 'src', 'index.html')
				}),
			],
			module: {
				rules: [
					{
						test: /\.css$/i,
						use: ["style-loader", "css-loader"],
					},
				],
			},
			devServer: {
				port: 5000,
				open: true,
			},
		}
	};