import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    // Use a relative base so assets work both at repository subpaths and at root pages
    // This avoids missing assets when GitHub Pages serves the site at a different path.
    base: './',
  server: {
    port: 3000,
    open: true
  }
})
