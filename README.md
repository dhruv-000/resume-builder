# Resume Builder Pro (100% Static)

Resume Builder Pro is a fully static React + Vite web app designed for GitHub Pages hosting.

## Static Architecture

- No backend
- No database
- No API dependencies
- Browser-only persistence with `localStorage`
- Client-side PDF export with `html2pdf.js`
- Deployable as static files (`dist/`) on GitHub Pages

## Features

- Landing page
- Dashboard (local resumes)
- Resume editor
- Template gallery
- Customization panel
- Section manager
- Client-side PDF export
- Frontend-only settings and JSON backup/restore

## Tech Stack

- React + Vite
- Tailwind CSS
- React Context API
- localStorage
- html2pdf.js

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## GitHub Pages Deployment

This project already uses `base: './'` in `vite.config.js`, making it static-hosting friendly.

### Option A: GitHub Pages via Actions (recommended)

1. Push this project to GitHub.
2. In your repo, open `Settings > Pages`.
3. Set Source to `GitHub Actions`.
4. Add workflow `.github/workflows/deploy.yml`:

```yaml
name: Deploy Vite app to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### Option B: Manual

1. Run `npm run build`.
2. Upload `dist/` contents to your Pages branch (for example `gh-pages`).

## Data Storage Note

All resumes and settings are stored in each user’s browser `localStorage`. Data does not sync across devices unless exported/imported using backup JSON.
