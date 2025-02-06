declare module 'vue/compiler-dom' {
  export * from '@vue/compiler-dom';
}

declare module 'vite' {
  export type { PluginOption } from 'vite/types/node/plugin'
  
  interface Plugin {
    enforce?: 'pre' | 'post';
    apply: 'serve' | 'build';
  }
  interface UserConfig {
    vueCompilerOptions?: any;
  }
} 