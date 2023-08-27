import * as esbuild from "esbuild";
import { cp as copy } from "fs";

const buildServer = async () => {
  await esbuild.build({
    entryPoints: ["src/server.tsx"],
    outdir: "build/",
    platform: "node",
    bundle: true,
    minify: true,
  });
};

const onBuildPlugin = {
  name: "onBuild",
  setup(build) {
    build.onStart(() => {
      console.log("Build started");
      buildServer();
      // Copy static assets into build directory
      copy("public/", "build/public", { recursive: true }, () => {});
    });

    build.onEnd(() => {
      console.log("Build finished");
    });
  },
};

const watch = process.argv.includes("--watch");

const config = {
  sourcemap: watch,
  entryPoints: ["src/index.tsx"],
  bundle: true,
  minify: true,
  outdir: "build/public/src",
  plugins: [onBuildPlugin],
};

if (watch) {
  const context = await esbuild.context(config);
  await context.watch();
} else {
  esbuild.build(config);
}
