import webpack from 'webpack';
import config from './webpack.config.base';

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  output: config.output,
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      __DEV__: JSON.stringify(false),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: config.loaders,
  }
};