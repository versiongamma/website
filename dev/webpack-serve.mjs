import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const webpackConfig = {
  devtool: "source-map",
  entry: ["./dev/index.tsx"],
  target: "web",
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
    }),
    new MiniCssExtractPlugin({
      filename: "src/index.css",
      chunkFilename: "index.css",
    }),
  ],
  devServer: {
    port: 4000,
    headers: {},
    historyApiFallback: true,
  },

  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "esbuild-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "src/index.js",
    publicPath: "/",
  },
};

const compiler = webpack(webpackConfig);
const devServerOptions = webpackConfig.devServer;
const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log("Starting server...");
  await server.start();
};

runServer();
