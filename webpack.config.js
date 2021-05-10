// Modules
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const path = require('path')

// Variables
const isProd = process.env.NODE_ENV === 'production'
let mode = 'development'
let devTool = 'source-map'
let target = 'web'

const optimization = {
  splitChunks: {
    chunks: 'all',
  },
  minimize: true,
  minimizer: [
    new JsonMinimizerPlugin()
  ]
}

if (isProd) {
  mode = 'production'
  devTool = false
  target = 'browserslist'

  optimization.minimizer.push(
    new TerserPlugin({
      parallel: true
    })
  )
}

// Functions
const fileName = (prodMode, name, ext) => prodMode ? `[${name}].[contenthash].${ext}` : `[${name}].${ext}`

// Exports
module.exports = {
  mode: mode,
  entry: {
      app: path.resolve(__dirname, 'src', 'index.js'),
      nav: path.resolve(__dirname, 'src', 'js', 'nav.js'),
      testimonial: path.resolve(__dirname, 'src', 'js', 'testimonial.js')
  },
  output: {
      assetModuleFilename: 'images/[hash][ext][query]',
      filename: fileName(isProd, 'name', 'js'),
      path: path.resolve(__dirname, 'build'),
      clean: true
  },
  optimization: optimization,
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'build'),
    open: true,
    compress: true,
    port: 9000
  },
  module: {
      rules: [
          {
            test: /\.html$/i,
            loader: 'html-loader'
          },
          {
            test: /\m?.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime']
              }
            }
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {publicPath: '../'}
              },
              'css-loader',
              'sass-loader'
            ]
          },
          {
            test: /\.(png|jpe?g|gif)$/,
            type: 'asset/resource'
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
              {
                loader: ImageMinimizerPlugin.loader,
                options: {
                  minimizerOptions: {
                    plugins: [
                        ['pngquant', {quality: [0.5, 0.5]}],
                        ['mozjpeg', {quality: 50, progressive: true}]
                      ]
                  },
                },
              },
            ]
          }
      ] 
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd
      }
    }),
    new MiniCssExtractPlugin({
      filename: `./css/${fileName(isProd, 'name', 'css')}`,
      chunkFilename: `./css/${fileName(isProd, 'id', 'css')}`
    }),
    new CopyPlugin({
      patterns: [
        {from: "src/assets/*.json", to: "[name][ext]"}
      ]
    })
  ],
  devtool: devTool,
  target: target
}
