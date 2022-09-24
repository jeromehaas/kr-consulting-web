const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: './public/js/main.js',
	resolve: {
		extensions: ['.webpack.js', '.js' ]
	},
	mode: 'development',
	output: {
		filename: '[name].build.js',
		path: path.join(__dirname, 'js'),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [["@babel/transform-runtime"]]
					}
				}
			},
			{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
		]
	}, 
	plugins: [
		new Dotenv({ path: '../craft/.env'})
	]
}