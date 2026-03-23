# Strava for Business — Challenge Mockup Tool

A multi-file React app for generating branded Strava Sponsored Challenge mockup screens. Deployed via GitHub Pages from the `structured` branch.

## Live URL

`https://jross-lab.github.io/mockup/`

## File structure

| File | What's in it |
|---|---|
| `index.html` | HTML shell + CDN script imports (React 18, Babel). Load order matters. |
| `tokens-icons.js` | Design tokens (`T` object), font/html2canvas loaders, avatar + facepile + map image data (base64), all SVG icon components, bottom nav icon paths + tab config |
| `shared.js` | Panel helpers (Field, Input, UploadBox), PhoneShell, TopNav, TopNavHome, BottomNav, and shared screen building blocks (HeroBadge, InfoRow, OrangeBtn, SponsorCard, Leaderboard, ProgressCard, StatsGrid, FeaturedAthletes, DescriptionSection, Facepile) |
| `screens-detail.js` | Challenge Detail screens: Not Joined, Joined, Completed, Takeover, Follower Callout: Milestone |
| `screens-feed.js` | Discovery + Feed screens: Groups Tab, Home Feed (Follower + In-Feed Unit), Segment Challenge. Also contains ScreenRouter and `GROUPS_TAB_SCREENS` set. |
| `app.js` | App component (control panel, state management, screen selector dropdown, export logic) + ReactDOM.render |

All files register their exports onto `window.MT` so subsequent files can destructure them.

## Screen registry

| Screen key | Label in UI | Dropdown group | File | Bottom nav tab |
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

## Embedded image assets

Several images are stored as base64 data URLs in `tokens-icons.js` to avoid external dependencies:

| Constant | What it is | Format |
|---|---|---|
| `MILESTONE_AVATAR` | Strava subscriber avatar (cyclist with sunglasses) | PNG with transparent background, 96x96 (2x retina) |
| `SUBSCRIBER_AVATAR` | Secondary subscriber avatar | JPEG, 48x48 |
| `AVATAR_IMG` | Generic placeholder avatar (SVG silhouette) | Inline SVG data URL |
| `FACEPILE_IMG` | 3 overlapping athlete avatars | PNG with transparent background |
| `MILESTONE_MAP_IMG` | Strava route map (Stamford Hill area) | JPEG, 560x440 (2x retina) |

## SVG components

The Follower Callout: Milestone screen uses pixel-perfect SVGs for the status bar and top navigation bar, provided directly from Figma exports. These are rendered as inline `<svg>` elements inside the `TopNavHome` component in `shared.js`.

## How to make edits

This repo is connected to a Claude AI project that can commit changes directly via the GitHub API. The workflow is:

1. Open the Claude project for this mockup tool
2. Describe the change you want (e.g. "change the badge size to 100px" or "add a new screen for...")
3. Claude fetches the relevant file(s) from GitHub, makes the edit, and commits directly to the `structured` branch
4. Pull locally to preview, or wait for GitHub Pages to deploy

**Local preview:** This is a no-build-step app. Just open `index.html` in any browser. It loads React and Babel from CDNs and compiles JSX client-side. No `npm install` or dev server needed.

## How to deploy

1. All files live in the root of the `structured` branch
2. GitHub Pages is configured to serve from this branch
3. Any commit to `structured` triggers a redeploy automatically

## Architecture notes

- No build step — Babel compiles JSX in-browser via `<script type="text/babel">`
- All modules share state via `window.MT` namespace
- html2canvas is loaded from CDN for PNG export
- React 18 loaded from unpkg CDN
- PhoneShell renders at 375x812px (iPhone viewport) inside a 391px frame with 8px orange padding
- Phone is displayed at 0.85x scale in the preview area
- The `screenRef` on PhoneShell is used by html2canvas for PNG export — don't break this ref chain

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
  font:       "'Boathouse', ...",      // Display/heading font
  fontMaison: "'Maison Neue', ...",    // UI/body font
};
```

## Which file to edit

| What you want to do | Edit this file |
|---|---|
| Change colours, fonts, or design tokens | `tokens-icons.js` |
| Add or modify an SVG icon | `tokens-icons.js` |
| Replace an embedded image (avatar, facepile, map) | `tokens-icons.js` |
| Change the phone shell, bottom nav, or top nav | `shared.js` |
| Modify a shared component (badge, info rows, sponsor card, leaderboard, etc.) | `shared.js` |
| Edit Challenge Detail screens (Not Joined, Joined, Completed) | `screens-detail.js` |
| Edit the Takeover or Follower Callout: Milestone screen | `screens-detail.js` |
| Edit the Groups Tab, Home Feed, or Segment Challenge | `screens-feed.js` |
| Add a brand-new screen | The relevant screens file + register in `screens-feed.js` ScreenRouter + add option in `app.js` |
| Add a new control panel field or change export logic | `app.js` |
