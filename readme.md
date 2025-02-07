# 安装
```bash
npm install vite-plugin-vue-hook-bind --save-dev
```

# 使用
```ts
// vite.config.ts
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import hookBind from 'vite-plugin-vue-hook-bind'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni(), hookBind({
    prefix: 'v-ehb', // 自定义前缀
    inheritAttrs: false, // 是否继承attrs
  })],
});

// 使用
```vue
<template>
  <div v-ehb="tableHook">test</div>
  <HelloWorld v-ehb="tableHook" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableHook = ref({
  msg: 'hello',
  style: { color: 'red' } // 自定义属性
})
</script>
```
