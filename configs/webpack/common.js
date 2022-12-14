// shared config (dev and prod)
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './index.tsx',
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		alias: {
			'@icons': 'src/assets/icons',
		},
	},
	context: resolve(__dirname, '../../src'),
	module: {
		rules: [
			{
				test: [/\.jsx?$/, /\.tsx?$/],
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(scss|sass)$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(jpe?g|gif|png|svg|woff|woff2|eot|ttf|)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
						},
					},
				],
			},
		],
	},
	plugins: [new HtmlWebpackPlugin({ template: 'index.html.ejs' })],
};
