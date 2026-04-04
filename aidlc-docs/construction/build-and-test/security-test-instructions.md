# Security Test Instructions

## Purpose
Validate the security baseline across both the public site and the protected admin flow, including the auth-observability increment.

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
curl -I http://localhost:3000/admin/auth-error
```

Verify these headers are present:
- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Referrer-Policy`

### 3. Protected Route Authorization Check
- Open `http://localhost:3000/admin` in a clean browser session.
- Verify the app redirects to `/admin/sign-in?callbackUrl=%2Fadmin`.
- Sign in with an allowlisted account and verify `/admin` renders.
- Sign in with a non-allowlisted account and verify the app redirects to `/admin/access-denied`.

### 4. Auth-Error Separation Check
- Trigger a controlled auth misconfiguration or failure.
- Verify the app routes to `/admin/auth-error` instead of `/admin/access-denied`.
- Verify the page shows retry guidance without exposing framework internals.

### 5. Auth Log Redaction Check
- Watch the server logs during login, denial, and auth-error scenarios.
- Verify logged events are JSON lines.
- Verify logs contain event names such as `auth_route_entry`, `admin_access_denied`, or `admin_auth_session_failure`.
- Verify logs do not contain:
  - full email addresses
  - tokens
  - secrets
  - raw provider payloads
  - full auth-sensitive query strings

### 6. Production Host Redirect Check
- Set `NEXTAUTH_URL`, `AUTH_URL`, and `AUTH_TRUST_HOST=true` for the real production domain.
- Sign in and sign out through the deployed runtime.
- Verify redirects resolve against the real production host instead of localhost.

### 7. Docker Image Tag Review
- Inspect `src/web/Dockerfile`
- Confirm the base image does not use `latest`
