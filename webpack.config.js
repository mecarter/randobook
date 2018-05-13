const path = require('path');

module.exports = {
  entry: ['whatwg-fetch', './client/index.jsx'],

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'randobook.js'
  },
  
  mode: process.env.MODE,

  watch: process.env.MODE === 'development',

  module: {
    rules: [{
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  }
};
