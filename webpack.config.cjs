const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    "src/background/service-worker": "./src/background/service-worker.ts",
    "src/content/gmail": "./src/content/gmail.ts",
    "src/content/naver": "./src/content/naver.ts",
    "src/popup/index": "./src/popup/popup.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[name].js",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/popup/index.html",
      filename: "src/popup/index.html",
      chunks: ["src/popup/index"],
      inject: "body",
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public/manifest.json", to: "manifest.json" }],
    }),
  ],
};
