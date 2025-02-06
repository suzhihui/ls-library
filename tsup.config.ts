import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    compilerOptions: {
      skipLibCheck: true,
      module: 'NodeNext'
    }
  },
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['vue', 'vite', '@vue/compiler-dom'],
  tsconfig: './tsconfig.json'
}) 