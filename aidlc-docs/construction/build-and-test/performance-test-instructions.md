# Performance Test Instructions

## Purpose
Validate that the public landing page and the new admin entry flow remain responsive on normal desktop and mobile conditions.

## Performance Requirements
- **Response Goal**: page should feel responsive on normal mobile connections
- **Rendering Goal**: major above-the-fold content should appear quickly
- **Layout Goal**: mobile layout should remain readable and stable
- **Asset Goal**: local assets and decorative styling should not create obvious loading drag
- **Admin Goal**: `/admin/sign-in` should render quickly and the protected shell should not feel heavy after sign-in

## Recommended Checks

### 1. Local Lighthouse-Style Pass
Start the production app:
```bash
cd src/web && npm run build
cd src/web && npm start
```

Then run a Lighthouse audit in Chrome DevTools against `http://localhost:3000`.

Repeat a focused audit against `http://localhost:3000/admin/sign-in`.

### 2. Mobile Device Emulation
- Open browser devtools mobile emulation
- Verify:
  - hero remains legible
  - opening hours remain easy to scan
  - CTAs remain touch-friendly
  - reviews and taste-of-the-week blocks do not collapse awkwardly
  - the admin sign-in card remains readable and tappable
  - the access-denied page actions remain reachable without layout overflow

### 3. Docker Runtime Check
```bash
docker build -t basijsenzo:local ./src/web
docker run --rm -p 3000:3000 --env-file .env.local basijsenzo:local
```

Verify the containerized version feels equivalent to the local production runtime.

## If Performance Needs Improvement
1. reduce heavy visual layers or oversized imagery
2. simplify shadows or decorative gradients if they become excessive
3. verify local assets are appropriately sized
4. inspect any heavy admin-shell assets or client-only dependencies added later
5. rerun build and browser audits
