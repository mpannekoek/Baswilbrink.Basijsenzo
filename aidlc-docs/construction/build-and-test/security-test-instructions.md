# Security Test Instructions

## Purpose
Validate the security baseline across both the public site and the protected admin flow.

## Checks

### 1. Dependency Audit
```bash
cd src/web && npm audit
```

If actionable vulnerabilities appear, review whether they affect runtime dependencies before promoting the build.

### 2. Response Header Verification
Start the app:
```bash
cd src/web && npm run build
cd src/web && npm start
```

Then inspect headers:
```bash
curl -I http://localhost:3000
curl -I http://localhost:3000/admin/sign-in
curl -I http://localhost:3000/admin/access-denied
```

Verify these headers are present:
- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Referrer-Policy`

For CSP, verify the policy still contains at least `default-src 'self'` and that any inline-script allowance remains documented as a Next.js runtime requirement.

### 3. Protected Route Authorization Check
- Open `http://localhost:3000/admin` in a clean browser session.
- Verify the app redirects to `/admin/sign-in?callbackUrl=%2Fadmin`.
- Sign in with an allowlisted account and verify `/admin` renders.
- Sign in with a non-allowlisted account and verify the app redirects to `/admin/access-denied`.

This validates the current `SECURITY-08` boundary from the application layer.

### 4. Sign-Out And Session Handling Check
- Sign in with an allowlisted account.
- Use the sign-out button from the protected admin shell.
- Verify the browser returns to `/`.
- Verify a direct revisit to `/admin` requires a fresh authenticated session.

This validates the current `SECURITY-12` session invalidation expectation.

### 5. Docker Image Tag Review
- Inspect `src/web/Dockerfile`
- Confirm the base image does not use `latest`

### 6. Production Behavior Check
- Confirm the built app starts without exposing framework debug pages or stack traces during normal use
- Confirm cancelled Microsoft logins return to the custom sign-in page instead of a framework-owned error page
