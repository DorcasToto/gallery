const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './server.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'production.js',
  },
  target: 'node',
  externals: [nodeExternals()],
  externalsPresets: {
    node: true
  },
};