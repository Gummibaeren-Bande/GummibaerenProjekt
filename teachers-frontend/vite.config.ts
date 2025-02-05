import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import dotenv from 'dotenv'

// Load environment variables from server.env
dotenv.config({ path: './server.env' })
// https://vite.dev/config/
export default defineConfig({
  base: '/panel/',
  plugins: [vue(), vueDevTools(), tailwindcss()],
  server: {
    port: 8081,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
