# Copilot Instructions for AntonyDaSilva

## Project Snapshot
- Static site compiled from `src/` into `public/`; never edit `public/` directly—rerun the build instead so includes and assets stay in sync.
- `src/index.html` is the only top-level page and stitches partials via Gulp `@@include` directives; add new sections there so navigation stays centralized.

## Build & Dev Workflow
- Install deps with `npm install`; primary commands live in `package.json` scripts.
- `npm run dev` → runs `gulp fileinclude`, copies JS/media, then watches: `npm run watch-html` (Gulp) for HTML/includes and `npm run watch-css` (node-sass) for SCSS.
- `npm run build` → one-off production build (includes SCSS compilation) and is the command to run before committing output under `public/`.
- `gulp mediacopy` copies only the first level of `src/media/*`; nest folders only after extending that glob or files will be skipped in `public/media/`.

## HTML Assembly Pattern
- Partials live in `src/partials/`; include them using `@@include('./partials/foo.html')`.
- Section headings use `partials/section-title.html`, which expects a `section-title` param used for both text and `id`. Keep it anchor-safe (matches navbar hashes like `#Movies`).
- Example: `@@include('./partials/section-title.html', { "section-title": "Gallery" })` injects an `<h2>` with id `Gallery`; update navbar links (`partials/header.html`) to match.

## Styling Conventions
- `src/bootstrap.scss` overrides Bootstrap defaults _before_ importing `bootstrap/scss/bootstrap`; declare new `$variable`s above the import.
- All custom utility classes (e.g., `.shadow-5`, `.youtube-video-container`, `.flip-img`) live in the same file; extend there so `node-sass` emits a single `public/css/bootstrap.css` bundle.
- The SCSS watcher (`watch-css`) first runs a full compile, so missing directories under `public/css/` usually mean the initial compile failed—fix errors, rerun the script.

## Asset & Script Handling
- Bootstrap JS is pulled from `node_modules/bootstrap/dist/js/bootstrap.min.*` via `gulp bootstrapjscopy`; do not vendor custom builds without updating that glob.
- Slick carousel assets (`src/media/slick*.{css,js}`) are copied verbatim to `public/media/`; jQuery 1.11 + migrate are loaded from CDNs inside `src/index.html`.
- When adding new media (audio, images, docs), drop them under `src/media/` and ensure filenames referenced in HTML exactly match post-copy paths (e.g., `./media/Black Gold.mp3`).
- Custom JS currently lives inline at the bottom of `src/index.html`; if you add more behavior, keep dependencies ordered (jQuery → jQuery Migrate → Slick → custom script → `./js/bootstrap.min.js`).

## Troubleshooting Tips
- If includes stop updating, verify `gulp watch` is running; it only monitors `src/*.html`, so edits inside `partials/` require touching the parent page or expanding the glob.
- Missing styles usually mean `node-sass` failed—run `npm run watch-css` separately to see compilation errors.
- Stuck assets in `public/media/` often indicate the copy task was not rerun; execute `gulp mediacopy` or `npm run build` after changing files under `src/media/`.
