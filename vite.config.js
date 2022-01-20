const path = require('path');
const { defineConfig } = require('vite');
const styleImport = require('vite-plugin-babel-import');
const OptimizationPersist = require('vite-plugin-optimize-persist');
const PkgConfig = require('vite-plugin-package-config');

const reqUMDInject = require('./plugins/require-umd-inject');

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [
    PkgConfig.default(),
    OptimizationPersist.default(),
    styleImport.default([
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        camel2DashComponentName: false,
        style: name => {
          if (name === "col" || name === "row") {
            return "antd/lib/style/index.less";
          }
          return `antd/es/${name}/style/index.less`;
        },
      },
    ]),
    reqUMDInject(),
  ],
  server: {
    port: 7788,
    open: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
  build: {
    write: false,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        format: 'iife',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // modifyVars: themeVariables,
      },
    },
  },
});
