// dev-server.js
import {createServer} from 'esbuild-server';

console.log(createServer);

createServer(
    {
      logLevel: "info",
      outfile: "dist/App.js",
      bundle: true,
      entryPoints: ['./src/App.js'],
      loader: { '.js': 'jsx' }
    },
    {
      static: 'dist',
      port: 8081,
    }
  )
  .start();