const path = require('path');

module.exports = {
  mode: 'development',
  entery: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
  },
  devtool: 'source-map'
}
