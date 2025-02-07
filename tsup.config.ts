import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    resolve: true
  },
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.mjs',
    }
  },
  minify: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['vue', 'vite', '@vue/compiler-dom'],
  tsconfig: './tsconfig.json'
}) 