# Mostafa Asadi — Senior Frontend Engineer

An English, expertise-led portfolio built with Astro, TypeScript, Tailwind CSS, and a selectively hydrated React / Motion expertise explorer. All pages are statically generated and deploy to GitHub Pages without a server.

Site URL: [mostafaasadi3.github.io](https://mostafaasadi3.github.io/)

## Local development

Use Node.js 24 LTS (minimum 22.22).

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro. `npm run build` runs type checks and generates `dist/`. `npm run preview` serves that production build locally.

On Windows, double-click `start-portfolio.cmd` to start the dev server directly on your computer. Keep its terminal window open and visit the **Local** URL printed by Astro. This is also the correct way to preview when an agent's sandboxed server cannot be reached from your desktop browser.

## Deploy to GitHub Pages

1. Push this directory to a GitHub repository on the `main` branch.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. The included workflow builds and deploys on pushes to `main`, or from **Actions → Deploy portfolio to GitHub Pages → Run workflow**.

The workflow obtains the actual site origin and base path from GitHub. It supports both `USERNAME.github.io` and project repositories such as `USERNAME.github.io/portfolio/`. Set a custom domain in the repository’s Pages settings if needed; the same workflow uses its returned URL.

To test a project path locally (PowerShell):

```powershell
$env:SITE_URL = 'https://example.github.io'
$env:BASE_PATH = '/portfolio'
npm run build
npm run preview
```

Open `/portfolio/`. Remove these environment overrides to return to the default root path.

## Content

- `src/data/portfolio.ts`: identity, email, expertise topics, toolkit, and project descriptions.
- `src/pages/index.astro`: primary portfolio content.
- `src/pages/resume.astro`: English résumé with a browser Print / Save as PDF action.
- `src/styles/global.css`: visual tokens, layouts, interactions, responsive and print styles.
- `src/components/ExpertiseExplorer.tsx`: keyboard-accessible React tabs with Motion transitions.

Only the expertise explorer loads React in the browser. The hero illustration, navigation, project disclosures, and core content are static HTML/SVG with small progressive enhancements. No analytics, third-party embeds, or remote fonts are required.

Project illustrations are original conceptual interface studies, clearly identified as illustrative. They are not client screenshots, clinical images, or claims of measured business outcomes.

### Editorial checks before public launch

- Confirm the preferred English name and official English employer names.
- GitHub and LinkedIn use the URLs supplied by the owner: `MostafaAsadi3` and `mostafa-asadi-78a597271`.
- Additional senior engineering topics are presented as focus areas. Confirm depth and specific tools before making further claims about experience.
- Résumé dates use Gregorian year ranges corresponding to the source’s Solar Hijri months. Confirm exact Gregorian month/day dates before adding finer precision. Source: Tir 1405–present; Aban 1403–Khordad 1405; Ordibehesht–Mehr 1403; Aban–Esfand 1402. Education: 1392–1396.
- The email comes from the supplied résumé; replace it here if a different professional address is preferred.

Street address, age, marital status, military service, and salary are intentionally not published. The phone number and email supplied by the owner appear in the contact menu and contact section.

## Verification

```sh
npm run build
npx playwright install chromium
npm test
```

Browser checks run against `dist/` (build first) and cover server-rendered content with JavaScript disabled, tab keyboard behavior, contact actions, the résumé route, narrow-screen overflow, and automated accessibility. The accessibility scan is useful coverage, not a replacement for manual review.

To use an installed Chromium browser instead of downloading one, set `PLAYWRIGHT_EXECUTABLE_PATH` to its executable. `npm run serve` is a minimal local server for the production output; `PORT` and `BASE_PATH` are supported.

## Design and behavior

- Graphite surfaces, pale blue accents, Manrope typography, IBM Plex Mono labels, and a custom layered architecture illustration.
- Nine expertise disciplines ordered from architecture and language fundamentals through delivery.
- Three visual expertise pillars, grouped tool chips, numbered chapters, sticky navigation, and a reading progress indicator.
- Scroll entrances combine a fade, a short upward movement, and a subtle blur, with staggered entry for groups of cards. Reduced-motion preferences keep all content visible without these effects.
- Native project disclosures; focused animations; keyboard and touch interactions.
- Reduced-motion preferences, visible focus states, a skip link, and content that remains visible if JavaScript is unavailable.
- Static résumé and 404 routes; locally bundled Latin fonts; custom social preview artwork.

## Search engine metadata

Page titles and descriptions, canonical URLs, Person / WebSite / WebPage structured data, and social preview metadata are generated in the shared layout. The resume has its own metadata; the 404 page is marked `noindex`.

`/sitemap.xml` lists the home and resume pages. `/robots.txt` allows crawling and points to the sitemap. Production URLs follow `SITE_URL` and `BASE_PATH`, with the current public site as the default origin.

After deployment, the owner can verify the URL-prefix property in Google Search Console and submit `sitemap.xml`. Search indexing and rankings are controlled by search engines, not guaranteed by these changes.
