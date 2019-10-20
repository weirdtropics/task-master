/* eslint-disable */
const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const APP_DIR = path.resolve(__dirname, "./src");
const OUT_DIR = path.resolve(__dirname, "./");

module.exports = env => {
  const { NODE_ENV } = env;
  return merge([
    {
      entry: ["@babel/polyfill", APP_DIR],
      output: {
        filename: "[name].bundle.js",
        path: path.join(OUT_DIR, "build")
      },
      devtool: "inline-source-map",
      mode: "development",
      devServer: {
        contentBase: path.join(APP_DIR, "dist"),
        compress: false,
        port: 3000
      },
      target: "web",
      optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all"
            }
          }
        }
      },
      module: {
        rules: [
          {
            oneOf: [
              {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve("url-loader"),
                options: {
                  limit: 50000,
                  name: "static/media/[name].[hash:8].[ext]"
                }
              },
              {
                test: /\.js(x)?$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    cacheDirectory: true,
                    babelrc: false,
                    presets: [
                      [
                        "@babel/preset-env"
                        // { targets: { browsers: 'last 2 versions' } },
                      ],
                      "@babel/preset-react"
                    ],
                    plugins: [
                      ["@babel/plugin-proposal-decorators", { legacy: true }],
                      [
                        "@babel/plugin-proposal-class-properties",
                        { loose: true }
                      ],
                      "react-hot-loader/babel"
                    ]
                  }
                }
              },
              {
                test: /\.s[ac]ss$/i,
                use: [
                  "style-loader",
                  "css-loader",
                  {
                    loader: "sass-loader",
                  }
                ]
              }
            ]
          }
        ]
      },
      resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".jsx", ".json"]
      },
      plugins: [
        new webpack.DefinePlugin({
          "process.env": {
            NODE_ENV: JSON.stringify(NODE_ENV)
          }
        }),
        new CopyWebpackPlugin([{ from: "public" }]),
        new HtmlWebpackPlugin({
          template: "public/index.html",
          filename: "./index.html"
        })
      ]
    }
  ]);
};
