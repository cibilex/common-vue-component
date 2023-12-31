import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: './src/main.ts',
      formats: ['es', 'cjs'],
      name: 'common-vue-btn',
      fileName: (format) => {
        const ext = format == 'es' ? 'js' : 'cjs';
        return `${format}.${ext}`
      },
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: 'vue',
      output: {
        globals: {
          vue: 'vue'
        },
      }
    }
  }
})
