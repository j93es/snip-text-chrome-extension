import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        'src/popup/index': resolve(process.cwd(), 'src/popup/index.html'),
        'src/content/gmail': resolve(process.cwd(), 'src/content/gmail.ts'),
        'src/content/naver': resolve(process.cwd(), 'src/content/naver.ts')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].js',
        assetFileNames: 'assets/[name][extname]'
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  }
})
