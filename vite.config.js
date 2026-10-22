import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import wordbreak from './scripts/wordbreak-plugin.js'

// GitHub Pages：使用 HashRouter，base 用相對路徑即可在任何 repo 名稱下運作。
// 若要改成絕對路徑，可在建置時設定 BASE_PATH=/你的repo名稱/
export default defineConfig({
  base: process.env.BASE_PATH ?? './',
  plugins: [wordbreak(), react(), tailwindcss(),
    // 離線可用：第一次開啟後快取整站，現場網路不穩也能瀏覽（YouTube 影片除外）
    VitePWA({
      registerType: 'autoUpdate',
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2,webp,jpg,jpeg,png,svg}'],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
        runtimeCaching: [{
          urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
          handler: 'CacheFirst',
          options: { cacheName: 'google-fonts', expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 } },
        }],
      },
    }),
  ],
})
