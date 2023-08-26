import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";

const webpackConfig = {
  devtool: "source-map",
  entry: ["./dev/index.tsx"],
  target: "web",
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
  devServer: {
    port: 4000,
    headers: {},
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "esbuild-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
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
