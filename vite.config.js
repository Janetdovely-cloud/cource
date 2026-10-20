import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages：使用 HashRouter，base 用相對路徑即可在任何 repo 名稱下運作。
// 若要改成絕對路徑，可在建置時設定 BASE_PATH=/你的repo名稱/
export default defineConfig({
  base: process.env.BASE_PATH ?? './',
  plugins: [react(), tailwindcss()],
})
