# Build Instructions

## Prerequisites
- **Build Tool**: `npm` 11.11.0
- **Runtime**: `node` 24.14.0
- **Application Root**: `src/web`
- **Dependencies**: install from `src/web/package.json` and `src/web/package-lock.json`
- **Environment Variables**:
  - `AUTH_SECRET` for Auth.js session signing
  - `AUTH_MICROSOFT_CLIENT_ID` for Microsoft personal-account sign-in
  - `AUTH_MICROSOFT_CLIENT_SECRET` for Microsoft personal-account sign-in
  - `AUTH_ALLOWED_EMAILS` for allowlisted admin access
  - `NEXTAUTH_URL` for the production auth base URL
  - `AUTH_URL` for the production auth base URL
  - `AUTH_TRUST_HOST=true` when production host detection depends on proxy headers
  - optional: `PORT` for runtime override
- **System Requirements**:
  - Node.js 24+
  - npm 11+
  - network access for first-time dependency installation

## Build Steps

### 1. Install Dependencies
```bash
cd src/web && npm install
```

### 2. Build The Application
```bash
cd src/web && npm run build
```

### 3. Verify Build Success
- **Expected Output**: successful Next.js production build with static and dynamic route reporting
- **Build Artifacts**:
  - `src/web/.next/`
  - `src/web/.next/standalone/` when standalone output is generated
- **Common Acceptable Notes**:
  - build output lists `/` and `/_not-found` as static routes
  - build output lists `/admin`, `/admin/sign-in`, `/admin/auth-error`, and `/api/auth/[...nextauth]` as dynamic routes

### 4. Smoke-Test The Built Runtime
```bash
cd src/web && npm start
```

Verify:
- `http://localhost:3000/` renders the public landing page
- `http://localhost:3000/admin/sign-in` renders the custom admin sign-in page
- `http://localhost:3000/admin` redirects unauthenticated users into `/admin/sign-in`
- `http://localhost:3000/admin/access-denied` renders without runtime errors
- `http://localhost:3000/admin/auth-error` renders without runtime errors

## Docker Build

### 1. Build The Production Image
```bash
docker build -t basijsenzo:local ./src/web
```

### 2. Run The Container
```bash
docker run --rm -p 3000:3000 \
  -e AUTH_SECRET=replace-me \
  -e AUTH_MICROSOFT_CLIENT_ID=replace-me \
  -e AUTH_MICROSOFT_CLIENT_SECRET=replace-me \
  -e AUTH_ALLOWED_EMAILS=admin@example.com \
  -e NEXTAUTH_URL=https://basijsenzo.duckdns.org \
  -e AUTH_URL=https://basijsenzo.duckdns.org \
  -e AUTH_TRUST_HOST=true \
  basijsenzo:local
```

### 3. Verify Container Runtime
- Open `http://localhost:3000`
- Confirm the landing page loads
- Confirm `/admin/sign-in` loads inside the containerized runtime
- Confirm `/admin` redirects unauthenticated users to the custom sign-in page
- Confirm `/admin/auth-error` loads when visited directly

## Troubleshooting

### Build Fails During Dependency Install
- **Cause**: packages missing or network unavailable
- **Solution**:
  1. verify internet access
  2. rerun `cd src/web && npm install`
  3. ensure `src/web/package-lock.json` is present and not corrupted

### Build Fails During Type Checking
- **Cause**: TypeScript or Next.js config drift
- **Solution**:
  1. run `cd src/web && npm run lint`
  2. inspect the reported file
  3. fix the type or config issue
  4. rerun `cd src/web && npm run build`

### Successful Microsoft Login Redirects To The Wrong Host
- **Cause**: production auth base URL is missing or inferred incorrectly
- **Solution**:
  1. set `NEXTAUTH_URL=https://basijsenzo.duckdns.org`
  2. set `AUTH_URL=https://basijsenzo.duckdns.org`
  3. set `AUTH_TRUST_HOST=true` when behind a reverse proxy
  4. restart the container or runtime

### Admin Routes Fail With Auth Configuration Errors
- **Cause**: one or more required auth environment variables are missing or malformed
- **Solution**:
  1. verify `AUTH_SECRET`, `AUTH_MICROSOFT_CLIENT_ID`, `AUTH_MICROSOFT_CLIENT_SECRET`, and `AUTH_ALLOWED_EMAILS` are set
  2. verify `NEXTAUTH_URL` and `AUTH_URL` point at the real production domain
  3. restart the runtime after updating the environment
