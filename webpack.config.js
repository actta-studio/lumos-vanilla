require("dotenv").config();
const path = require("path");
const webpack = require("webpack");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

const dirApp = path.join(__dirname, "app");
const dirAssets = path.join(__dirname, "assets");
const dirStyles = path.join(__dirname, "styles");
const dirNode = "node_modules";

module.exports = {
	entry: [path.join(dirApp, "index.js"), path.join(dirStyles, "index.scss")],
	resolve: {
		modules: [dirApp, dirAssets, dirStyles, dirNode],
	},

	plugins: [
		new webpack.DefinePlugin({
			IS_DEVELOPMENT,
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: "./assets",
					to: "",
				},
			],
		}),
		new MiniCssExtractPlugin({
			filename: "[name].min.css",
			chunkFilename: "[id].css",
		}),
		new ImageMinimizerPlugin({
			minimizer: {
				implementation: ImageMinimizerPlugin.imageminMinify,
				options: {
					plugins: [
						["gifsicle", { interlaced: true }],
						["jpegtran", { progressive: true }],
						["optipng", { optimizationLevel: 5 }],
					],
				},
			},
		}),
		new CleanWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: "",
						},
					},
					{
						loader: "css-loader",
					},
					{
						// NOTE: Performs a variety of transformations on CSS, such as autoprefixing, minification, and more. By using a loader to integrate PostCSS with Webpack, the project can take advantage of these transformations as part of the build process.
						loader: "postcss-loader",
					},
					{
						loader: "sass-loader",
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2?|fnt|ttf|eot|webp)$/,
				loader: "file-loader",
				options: {
					name(file) {
						if (process.env.NODE_ENV === "development") {
							return "[name].[ext]";
						}
						// generate random hash for file name - use name to preserve the original name - you can also do [name].[hash].[ext]
						// NOTE: The benefit of generating a random hash for the filename is that it helps to prevent browser caching issues. When a file's content changes, but its filename remains the same, the browser may continue to use the cached version of the file instead of downloading the updated version.
						return "[hash].[ext]";
					},
				},
			},
			{
				test: /\.(jpe?g|png|gif|svg|webp)$/i,
				use: [
					{
						loader: ImageMinimizerPlugin.loader,
					},
				],
			},
			{
				test: /\.(glsl|frag|vert)$/,
				loader: "raw-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(glsl|frag|vert)$/,
				loader: "glslify-loader",
				exclude: /node_modules/,
			},
		],
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					format: {
						comments: false,
					},
				},
				extractComments: false,
			}),
			new CssMinimizerPlugin({
				minimizerOptions: {
					preset: [
						"default",
						{
							discardComments: { removeAll: true },
						},
					],
				},
			}),
		],
		minimize: true,
	},
};
