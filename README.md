# Strava for Business — Challenge Mockup Tool

A multi-file React app for generating branded Strava Sponsored Challenge mockup screens. Deployed via GitHub Pages from the `structured` branch.

## Live URL

`https://jross-lab.github.io/mockup/`

## File structure

```
├── index.html                          # HTML shell, CDN imports, @font-face declarations
├── tokens-icons.js                     # Design tokens, icon components, image asset references
├── shared.js                           # PhoneShell, TopNavHome, BottomNav, shared UI primitives
├── screens-detail.js                   # Detail screens: Not Joined, Joined, Completed, Takeover, Milestone
├── screens-feed.js                     # Feed screens: Groups Tab, Home Feed, Segment + ScreenRouter
├── app.js                              # App component: control panel, state, export logic
├── assets/
│   ├── milestone_avatar.png            # Subscriber cyclist avatar (96×96, transparent)
│   ├── subscriber_avatar.jpg           # Secondary avatar (48×48)
│   ├── facepile_img.png                # 3 overlapping athlete avatars (transparent)
│   ├── milestone_map_img.jpg           # Strava route map (560×440)
│   └── fonts/
│       ├── Boathouse-Light.woff2       # weight 300
│       ├── Boathouse-Regular.woff2     # weight 400
│       ├── Boathouse-Medium.woff2      # weight 500
│       ├── Boathouse-Bold.woff2        # weight 700
│       └── Boathouse-Black.woff2       # weight 900
└── README.md
```

All JS files register exports onto `window.MT`. Load order matters: tokens → shared → screens-detail → screens-feed → app.

## Screen registry

| Screen key | Label in UI | Dropdown group | File | Bottom nav |
|---|---|---|---|---|
| `not-joined` | Not Joined | Challenge Detail | screens-detail.js | groups |
| `joined` | Joined | Challenge Detail | screens-detail.js | groups |
| `completed` | Completed | Challenge Detail | screens-detail.js | groups |
| `takeover` | Challenge Takeover | Challenge Detail | screens-detail.js | groups |
| `milestone` | Follower Callout: Milestone | Discovery | screens-detail.js | home |
| `groups-tab` | Groups Tab / Challenges | Discovery | screens-feed.js | groups |
| `feed-follower` | Home Feed / Follower Promotion | Home Feed | screens-feed.js | home |
| `feed-inunit` | Home Feed / In-Feed Unit | Home Feed | screens-feed.js | home |
| `segment` | Home Feed / Segment Challenge | Home Feed | screens-feed.js | home |

## Fonts

Boathouse (5 weights) is self-hosted in `assets/fonts/` with `@font-face` declarations in `index.html` using `font-display: swap`. Maison Neue falls back to Helvetica Neue.

## How to make edits

This repo is connected to a Claude AI project that commits changes directly via the GitHub API:

1. Open the Claude project for this mockup tool
2. Describe the change (e.g. "update the badge size" or "rebuild the takeover screen")
3. Claude fetches files, makes edits, and commits directly to the `structured` branch
4. Pull locally to preview (`git pull` → open `index.html`) or wait for GitHub Pages

**Local preview:** Just open `index.html` in any browser — no build step, no npm install.

## Architecture notes

- No build step — Babel compiles JSX in-browser via `<script type="text/babel">`
- All modules share state via `window.MT` namespace
- html2canvas loaded from CDN for PNG export
- React 18 loaded from unpkg CDN
- PhoneShell: 375×812px viewport, `overflowY: auto`, flex column
- BottomNav: `position: sticky, bottom: 0, marginTop: auto` — always at bottom
- TopNavHome: pixel-perfect SVG (status bar + title bar), 102px total height
- Takeover screen: modal overlay with scrim extending over top nav via `top: -102px`
- Images stored as separate files in `assets/` (not base64 inline)

## Design tokens

```js
const T = {
  orange:     "#FC5200",   // Strava brand orange
  textPri:    "#000000",   // Primary text
  textSec:    "#43423F",   // Secondary text
  textTer:    "#64635E",   // Tertiary text
  bgSurface:  "#FFFFFF",   // Card/surface background
  bgSunken:   "#F2F2F0",   // Sunken/recessed background
  divider:    "rgba(0,0,0,0.10)",
  font:       "'Boathouse', ...",
  fontMaison: "'Maison Neue', ...",
};
```

## Which file to edit

| What you want to do | Edit this file |
|---|---|
| Change colours, fonts, or design tokens | `tokens-icons.js` |
| Add/modify an SVG icon | `tokens-icons.js` |
| Replace an embedded image (avatar, map) | Replace file in `assets/`, update path in `tokens-icons.js` |
| Change phone shell, bottom nav, or top nav | `shared.js` |
| Modify shared components (badge, sponsor card, leaderboard, etc.) | `shared.js` |
| Edit Challenge Detail screens | `screens-detail.js` |
| Edit feed/discovery screens | `screens-feed.js` |
| Add a new screen | Screens file + `screens-feed.js` (router) + `app.js` (dropdown) |
| Add control panel fields or change export | `app.js` |
| Add fonts | Upload to `assets/fonts/`, add `@font-face` in `index.html` |
