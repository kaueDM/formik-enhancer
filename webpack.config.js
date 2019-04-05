const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    'web': './src/_web/index.js',
    'native': './src/_native/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, ''),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  externals: {
    'react': 'commonjs react'
  },
  optimization: {
    minimizer: [new TerserPlugin()]
  }
}
