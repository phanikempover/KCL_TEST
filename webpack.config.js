const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'index.web.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.js', '.ts', '.tsx', '.json'],
  },
  module: {
    rules: [
 {
      test: /\.js$|\.ts$|\.tsx$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          babelrc: true,
          presets: ['module:metro-react-native-babel-preset'],
        },
      },
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/i,  
      type: 'asset/resource',
    },
      
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), 
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },

  // devServer: {
  //   static: path.join(__dirname, 'public'),
  //   compress: true,
  //   port: 3000,
  //   historyApiFallback: true,
  // },
};
