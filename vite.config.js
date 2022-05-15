import { defineConfig } from 'vite';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { resolve } from 'path';
import { builtinModules } from 'module';

const commonjsPackages = [...builtinModules];

export default defineConfig({
  build: {
    outDir: './dist',
    sourcemap: false,
    minify: process.env.NODE_ENV === 'production',
    lib: {
      entry: './src/index.js',
      formats: ['cjs'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['@nodegui/nodegui', '@nodegui/react-nodegui', '@nodegui/qode', ...commonjsPackages],
      plugins: [nodeResolve],
    },
  },
});
