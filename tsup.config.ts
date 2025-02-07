import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.mjs',
    }
  },
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['vue', 'vite', '@vue/compiler-dom', 'node:module'],
  tsconfig: './tsconfig.json'
}) 