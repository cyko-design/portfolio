# Charles Yuen - Portfolio

Responsive, dependency-free portfolio implementation based on the desktop (`3:2`) and mobile (`3:161`) layouts in [Figma](https://www.figma.com/design/wLDbTBD9P3fbnicBZg09j5/Portfolio-Site--v2-?node-id=1-2).

## Status: draft, not ready to publish

The page structure, responsive styles, accessible mobile navigation and six external destinations are implemented. Asset downloads from Figma returned an access error in the build environment, so the six referenced image files have **not** been included. Inter is also not bundled yet. Visual fidelity remains unverified until these files are supplied. No public deployment has been configured or triggered.

Before launch:

1. Add the exact Figma assets listed in `assets/manifest.json`. Preserve the supplied artwork and SVG dimensions.
2. Add a licensed Inter variable font as `assets/inter-latin.woff2` and its licence as `assets/OFL.txt`.
3. Fill `resume` and `portfolio` in `links.js`. Their Figma buttons have no destination. Until configured, those controls are disabled.
4. Run `npm run check`, then compare at 1440px desktop and 390px mobile. Also check intermediate widths, keyboard navigation and enlarged text.

## Local preview

Run `npm run dev` and open `http://localhost:8000`. Python 3 and Node.js are required for the preview and checks respectively; the website itself has no runtime dependencies or build step.

## Links and content

`links.js` holds external destinations and applies them consistently to desktop and mobile. The MindLens and Considered buttons point to GitHub repositories, matching Figma, rather than guessed live-site addresses. Water Nymph's Read more button opens its supplied LinkedIn post.

`index.html` contains the semantic page content. `styles.css` contains shared tokens and responsive layouts. Project cards use four columns on wide screens, two on tablets and one on mobile. Mobile skills remain vertically stacked as designed. `app.js` handles the collapsible navigation, Escape, outside clicks and resize behaviour.

## Future GitHub Pages launch

After completing the launch checklist, enable Pages in this repository's Settings, choose **Deploy from a branch**, then `main` and `/ (root)`. Relative asset paths support the `/portfolio/` project path. This repository does not include an automatic deployment workflow.

The artwork and portfolio content belong to their respective owners. No redistribution licence is implied.
