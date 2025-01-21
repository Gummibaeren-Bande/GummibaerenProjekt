import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import dotenv from 'dotenv'
import { fileURLToPath, URL } from 'node:url'

// Load environment variables from server.env
dotenv.config({ path: './server.env' })

// https://vite.dev/config/
export default defineConfig({
  base: '/aks/',
  plugins: [vue(), vueDevTools()],
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
