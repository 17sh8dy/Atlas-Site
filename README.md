# Atlas Website

A dependency-free, production-quality marketing site for **Atlas**, built from the supplied product brief.

## Run locally

No build step or package install is required.

- Double-click `index.html`, or
- serve the folder with any static server.

For example:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Central configuration

All public product/deployment settings live near the top of `script.js`:

```js
const CONFIG = {
  version: '1.0.0',
  status: 'Available now',
  downloadUrl: 'https://github.com/17sh8dy/Atlas/releases/latest/download/Atlas_1.0.0_x64-setup.exe',
  githubUrl: 'https://github.com/17sh8dy/Atlas',
  discordUrl: 'https://discord.gg/XBhER9Z6EB',
}
```

### Activating the real download

The Download buttons open the Windows installer on GitHub Releases. The link is built from `CONFIG.version` in `script.js` (`Atlas_<version>_x64-setup.exe` on the latest release), so a new release needs only two steps: publish it from the Atlas repo with `pnpm release`, then set `CONFIG.version` here and push. Do not push a version whose release is not published yet, or the button will 404.

### Branding / future configuration

Change the same `CONFIG` object for version, status, GitHub, Discord, and download details. Theme colors and labels live in the `THEMES` object just below it.

## Included

- Responsive desktop/tablet/mobile layouts
- Mobile navigation
- Smooth anchor navigation
- Scroll reveal animations
- `prefers-reduced-motion` support
- Interactive customization preview
- Theme/accent switcher with local persistence
- Assistant name customization with local persistence
- Execution mode selector
- Download placeholder modal
- SEO metadata
- Editable SVG favicon
- Windows installer is available through GitHub Releases and Atlas supports automatic updates

## Deployment

This is a static site, so it can be deployed directly to Cloudflare Pages, Netlify, Vercel, GitHub Pages, or any static hosting provider.

For Cloudflare Pages, the project can be deployed with no framework build command and the repository/folder can be served as-is.

### Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → choose this repository.
2. Production branch: `main`. Framework preset: **None**.
3. Build command: *(leave empty)*. Build output directory: `/` (the repository root).
4. Save and deploy. Every push to `main` deploys automatically; other branches get preview URLs.

Nothing is built: the files in this repository are served exactly as they are.

## Languages

The site is translated into Spanish, French, German and Portuguese. The translations are generated files
in `i18n/` (`<lang>.json`, plus `<lang>.js` so the page also works when opened straight from disk). They
are produced by the shared NovaI18n tools, not edited by hand here: after changing any visible English text,
regenerate the catalogs (extract, translate, build) and commit the updated `i18n/` folder. `nova-i18n.js`,
`nova-i18n-boot.js` and `nova-i18n.css` are copies of the shared runtime, so change them in NovaI18n, not here.

## Screenshots

`assets/atlas-*.png` are real captures of Atlas 1.0.0. Replace them with new captures after a visible UI change.
