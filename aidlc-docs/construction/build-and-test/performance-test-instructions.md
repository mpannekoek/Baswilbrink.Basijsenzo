# Performance Test Instructions

## Purpose
Validate that the landing page stays visually rich while remaining comfortable on mobile and normal network conditions.

## Performance Requirements
- **Response Goal**: page should feel responsive on normal mobile connections
- **Rendering Goal**: major above-the-fold content should appear quickly
- **Layout Goal**: mobile layout should remain readable and stable
- **Asset Goal**: local assets and decorative styling should not create obvious loading drag

## Recommended Checks

### 1. Local Lighthouse-Style Pass
Start the production app:
```bash
npm run build
npm start
```

Then run a Lighthouse audit in Chrome DevTools against `http://localhost:3000`.

### 2. Mobile Device Emulation
- Open browser devtools mobile emulation
- Verify:
  - hero remains legible
  - opening hours remain easy to scan
  - CTAs remain touch-friendly
  - reviews and taste-of-the-week blocks do not collapse awkwardly

### 3. Docker Runtime Check
```bash
docker build -t basijsenzo:local .
docker run --rm -p 3000:3000 basijsenzo:local
```

Verify the containerized version feels equivalent to the local production runtime.

## If Performance Needs Improvement
1. reduce heavy visual layers or oversized imagery
2. simplify shadows or decorative gradients if they become excessive
3. verify local assets are appropriately sized
4. rerun build and browser audits
