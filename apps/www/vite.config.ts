import { defineConfig } from 'vite'
import sonik from 'sonik/vite'
import pages from '@sonikjs/cloudflare-pages'

export default defineConfig({
  // @ts-ignore
  plugins: [sonik(), pages()],
  server: {
    port: 3001,
  },
})
