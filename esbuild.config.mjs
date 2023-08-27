import * as esbuild from "esbuild";
import fs from "fs";

fs.cp("public/", "build/", { recursive: true }, () => {});

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
  outdir: "build/src",
  plugins: [onBuildPlugin],
};

if (watch) {
  const context = await esbuild.context(config);
  await context.watch();
} else {
  esbuild.build(config);
}
