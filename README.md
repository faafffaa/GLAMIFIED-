# Glamified Solutions (Vite + React + Tailwind)

This is a ready-to-run starter for your site. It includes:
- React with `react-router-dom`
- Tailwind CSS
- Framer Motion + Lucide icons
- Your provided `Website.jsx`

## Run locally
```bash
npm i
npm run dev
```

## Deploy to GitHub Pages
1. Create a new repo (e.g. `glamified-solutions`) on GitHub.
2. Push this project to that repo (see commands below).
3. In `vite.config.js`, uncomment `base` and set it to `/<REPO_NAME>/` (for example `'/glamified-solutions/'`).
4. Build and push the `dist` folder to the `gh-pages` branch using a GitHub Action or the `gh-pages` package.
   - Easiest: use the GitHub Action shown at `.github/workflows/deploy.yml`.

**Important (routing):** GitHub Pages is static hosting. `BrowserRouter` can 404 on refresh. Options:
- EASIEST: switch to `HashRouter` in `Website.jsx` (change `BrowserRouter` import & usage to `HashRouter`).
- Or keep `BrowserRouter` and add a `404.html` that redirects to `index.html` (already included).

## Deploy to Vercel or Netlify (recommended)
- Import your GitHub repo in Vercel/Netlify and select the default Vite build:
  - Build command: `npm run build`
  - Output directory: `dist`
These hosts handle SPA routing automatically, so `BrowserRouter` works fine.

## Git commands (first push)
```bash
git init
git add .
git commit -m "feat: glamified solutions site"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
git push -u origin main
```

## Dev tips
- Update contact info inside `Website.jsx` if needed.
- Tailwind classes are already wired via `src/index.css`.
- To run a production build locally: `npm run build && npm run preview`
