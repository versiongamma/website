import * as esbuild from "esbuild";
import fs from "fs";

fs.cp("public/", "build/", { recursive: true }, () => {});

const buildServer = async () => {
  await esbuild.build({
    entryPoints: ["src/server.tsx"],
    outdir: "build/",
    platform: "node",
    bundle: true,
  });
};

const exampleOnResolvePlugin = {
  name: "example",
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

const context = await esbuild.context({
  sourcemap: true,
  entryPoints: ["src/index.tsx"],
  bundle: true,
  outdir: "build/",
  plugins: [exampleOnResolvePlugin],
});

if (watch) {
  await context.watch();
}

context.dispose();
