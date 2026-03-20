# Strava for Business — Challenge Mockup Tool

A multi-file React app for generating branded Strava Sponsored Challenge mockup screens. Deployed via GitHub Pages.

## File structure

| File | What's in it | ~Size |
|---|---|---|
| `index.html` | HTML shell + script imports (load order matters) | 1.5k |
| `tokens-icons.js` | Design tokens, hooks, avatar data, all SVG icons | 16k |
| `shared.js` | Panel helpers, PhoneShell, TopNav, BottomNav, and shared screen building blocks (HeroBadge, InfoRow, OrangeBtn, SponsorCard, etc.) | 17k |
| `screens-detail.js` | Challenge Detail screens: Not Joined, Joined, Takeover, Milestone | 18k |
| `screens-feed.js` | Discovery + Feed screens: Groups Tab, Home Feed, Segment Challenge + ScreenRouter | 17k |
| `app.js` | App component (control panel, state, export logic) + ReactDOM.render | 9k |

All files register their exports onto `window.MT` so subsequent files can import them.

## Cheat sheet: which file to upload to Claude

| What you want to do | Upload this file |
|---|---|
| Change colours, fonts, or design tokens | `tokens-icons.js` |
| Add or modify an SVG icon | `tokens-icons.js` |
| Change the phone shell, bottom nav, or top nav | `shared.js` |
| Modify a shared component (badge, info rows, sponsor card, leaderboard, etc.) | `shared.js` |
| Edit the Challenge Detail Page (Not Joined or Joined) | `screens-detail.js` |
| Edit the Takeover modal or Milestone feed card | `screens-detail.js` |
| Edit the Groups Tab, Home Feed, or Segment Challenge | `screens-feed.js` |
| Add a brand-new screen | `screens-detail.js` or `screens-feed.js` (whichever group it fits) |
| Add a new control panel field or change export logic | `app.js` |
| Add a new screen AND a new panel field | Upload both the screens file AND `app.js` |

**Tip:** If you're not sure which file, just describe the change to Claude and ask which file to upload.

## How to deploy

1. Push all files to the root of your GitHub repo
2. Go to **Settings → Pages → Source** and select the branch (e.g. `main`) and `/ (root)`
3. GitHub Pages will serve `index.html` automatically

## How to make edits via Claude

1. Open a new Claude conversation
2. Upload the relevant file(s) as a `.js` text attachment
3. Describe the change you want
4. Claude returns the updated file
5. In GitHub web UI: navigate to the file → **Edit** (pencil icon) → paste the new content → **Commit**

## Architecture notes

- No build step — Babel compiles JSX in-browser via `<script type="text/babel">`
- All modules share state via `window.MT` namespace
- html2canvas is loaded from CDN for PNG export
- React 18 loaded from unpkg CDN
