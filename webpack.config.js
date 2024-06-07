const path = require('path');

module.exports = {
	entry: './src/index.ts',
	
		performance: {
		  maxAssetSize: 500000, // en bytes, ej. 500 KB
		  maxEntrypointSize: 500000, // en bytes
		  hints: 'warning' // 'error', 'warning', or false (to disable)
		},
	  
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize:512000,
	},
};