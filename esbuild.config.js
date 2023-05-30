import esbuildServe from "esbuild-serve";

esbuildServe(
  {
    logLevel: "info",
    entryPoints: ["src/App.tsx"],
    bundle: true,
    outfile: "dist/App.js",
  },
  {
    port: 8081,
    root: 'dist'
  }
);