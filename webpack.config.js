const path=require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports={
	mode: "production",
	entry: path.join(__dirname,'./src/index.js'),
	output: {
		path: path.join(__dirname,'./dist'),
		filename: "main.js"
	},
	plugins: [
		new HtmlWebpackPlugin()
	]
}
