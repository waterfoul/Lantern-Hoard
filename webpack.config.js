'use strict';

const LiveReloadPlugin = require('webpack-livereload-plugin');
const devMode = process.env.NODE_ENV === 'development';
const path = require('path');

/**
 * Fast source maps rebuild quickly during development, but only give a link
 * to the line where the error occurred. The stack trace will show the bundled
 * code, not the original code. Keep this on `false` for slower builds but
 * usable stack traces. Set to `true` if you want to speed up development.
 */

const USE_FAST_SOURCE_MAPS = false;

module.exports = {
	entry: {
		'bundle.js': path.resolve(__dirname, 'browser', 'index.jsx')
	},
	output: {
		path: __dirname,
		filename: 'browser/static/[name]'
	},
	context: __dirname,
	devtool: devMode && USE_FAST_SOURCE_MAPS ?
		'cheap-module-eval-source-map' :
		'source-map',
	resolve: {
		extensions: ['.js', '/index.js', '.jsx', '/index.jsx', '.json', '*']
	},
	module: {
		rules: [{
			test: /jsx?$/,
			exclude: /(node_modules|bower_components)/,
			use: [{
				loader: 'babel-loader',
				options: {
					presets: ['react', 'es2015', 'stage-2']
				}
			}]
		}]
	},
	plugins: devMode ? [
		new LiveReloadPlugin({
			appendScriptTag: true
		}),
		{
			apply: (compiler) => {
				compiler.plugin('compilation', function(compilation) {
					console.log('Build Started!');
				});
			}
		}
	] : []
};
