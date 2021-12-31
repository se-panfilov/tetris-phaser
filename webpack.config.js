const webpack = require('webpack');
const path = require('path');
const yaml = require('yamljs');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const isDevMode = process.argv[process.argv.indexOf('--mode') + 1] !== 'production';

const plugins = [
  new HtmlWebpackPlugin({
    title: 'Tetris'
  }),
  new MiniCssExtractPlugin({
    filename: isDevMode ? '[name].css' : '[name].[contenthash].css',
    chunkFilename: isDevMode ? '[id].css' : '[id].[contenthash].css'
  }),
  new ForkTsCheckerWebpackPlugin()
];

if (isDevMode) plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = {
  mode: isDevMode ? 'development' : 'production',
  entry: {
    index: './src/index.ts'
  },
  plugins,
  devtool: 'inline-source-map',
  devServer: {
    static: './dist'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse
        }
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    symlinks: false,
    plugins: [new TsconfigPathsPlugin()]
  },
  output: {
    filename: isDevMode ? '[name].js' : '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    pathinfo: true
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    removeAvailableModules: !isDevMode,
    removeEmptyChunks: !isDevMode,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }
            }
          ]
        }
      })
    ]
  }
};
