import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from 'path'

export default defineConfig({
  // 配置别名
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'src')
    }
  },
  server:{
      proxy:{
        '/api': {
          target: 'http://ceshi13.dishait.cn/admin',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      }
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
