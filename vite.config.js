import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If you deploy to GitHub Pages, set `base` to '/<REPO_NAME>/'.
// Example: base: '/glamified-solutions/'
export default defineConfig({
  plugins: [react()],
  // base: '/YOUR_REPO_NAME/',
})
