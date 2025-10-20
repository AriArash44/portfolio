import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/portfolio/' : '/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['developer-portfolio.png', 'favicon.ico'],
      manifest: {
        name: 'Arash Asghari Portfolio',
        short_name: 'AAPortfolio',
        description: 'Portfolio of Arash Asghari, Frontend developer curious about different fields.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: mode === 'production' ? '/portfolio/' : '/',
        icons: [
          {
            src: mode === 'production' ? '/portfolio/developer-portfolio.png' : '/developer-portfolio.png',
            sizes: '192x192 512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,ttf,woff,woff2}'],
        navigateFallback: mode === 'production' ? '/portfolio/index.html' : '/index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true 
      }
    })
  ],
}))