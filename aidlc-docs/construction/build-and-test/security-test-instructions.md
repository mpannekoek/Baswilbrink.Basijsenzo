# Security Test Instructions

## Purpose
Validate the secure public-site defaults implemented for this version.

## Checks

### 1. Dependency Audit
```bash
cd src/web && npm audit
```

### 2. Response Header Verification
Start the app:
```bash
cd src/web && npm run build
cd src/web && npm start
```

Then inspect headers:
```bash
curl -I http://localhost:3000
```

Verify these headers are present:
- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Referrer-Policy`

### 3. Docker Image Tag Review
- Inspect `src/web/Dockerfile`
- Confirm the base image does not use `latest`

### 4. Production Behavior Check
- Confirm the built app starts without exposing framework debug pages or stack traces during normal use
