import * as esbuild from "esbuild";
import { cp as copy } from "fs";
import postCssPlugin from "esbuild-style-plugin";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const buildServer = async () => {
  await esbuild.build({
    entryPoints: ["src/server.tsx"],
    outdir: "build/",
    platform: "node",
    bundle: true,
    minify: true,
  });

  console.log("\t└── ✔ Successfully built server");
};

const copyPublicDir = () => {
  copy("public/", "build/public", { recursive: true }, (error) => {
    if (error) {
      console.error(`✘ ${error.message}`);
      throw new Error(error);
    }

    console.log("\t├── ✔ Successfully copied public directory");
  });
};

const onBuildPlugin = {
  name: "onBuild",
  setup: (build) => {
    build.onStart(async () => {
      console.log("🚀 Build started...");
      copyPublicDir();
      await buildServer();
    });

    build.onEnd(() => {
      console.time;
      console.log("✅ Build finished");
    });
  },
};

const watch = process.argv.includes("--watch");
const sourcemap = process.argv.includes("--sourcemap");

const config = {
  sourcemap: sourcemap,
  entryPoints: ["src/index.tsx"],
  bundle: true,
  minify: true,
  outdir: "build/public/src",
  plugins: [
    onBuildPlugin,
    postCssPlugin({
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    }),
  ],
};

if (watch) {
  const context = await esbuild.context(config);
  await context.watch();
  console.log("🔄 Watching for changes...");
} else {
  esbuild.build(config);
}
