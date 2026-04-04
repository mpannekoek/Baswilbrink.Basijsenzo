# Integration Test Instructions

## Purpose
For this single-runtime web app, integration testing means validating that the built Next.js application, its auth configuration, protected admin routes, auth-error routing, and container packaging work together correctly.

## Test Scenarios

### Scenario 1: Built App Serves Complete Landing Page
- **Description**: Verify the production build serves the full landing page with all major sections
- **Setup**:
  - install dependencies in `src/web`
  - run a production build from `src/web`
- **Test Steps**:
  1. run `cd src/web && npm run build`
  2. run `cd src/web && npm start`
  3. open `http://localhost:3000`
  4. verify hero, opening hours, story, taste of the week, reviews, and visit/contact sections render
- **Expected Results**:
  - no runtime crash
  - all major content blocks appear
  - the real logo loads from `src/web/public/logo.png`

### Scenario 2: Unauthenticated Admin Requests Use The Custom Sign-In Flow
- **Description**: Verify protected admin entry sends unauthenticated users to the custom `/admin/sign-in` route
- **Setup**:
  - set the required auth environment variables
  - run the built app locally
- **Test Steps**:
  1. run `cd src/web && npm run build`
  2. run `cd src/web && npm start`
  3. open `http://localhost:3000/admin`
  4. confirm the browser lands on `http://localhost:3000/admin/sign-in?callbackUrl=%2Fadmin`
  5. confirm the page shows a single `Sign in with Microsoft` action
- **Expected Results**:
  - no generic NextAuth provider-selection page appears
  - the custom admin sign-in page renders cleanly
  - the sign-in button starts the Microsoft provider flow

### Scenario 3: Unexpected Auth Problems Use The Auth-Error Route
- **Description**: Verify configuration or route failures end at `/admin/auth-error` instead of `/admin/access-denied`
- **Setup**:
  - start the app with one required auth variable intentionally missing, or use a controlled callback failure case
- **Test Steps**:
  1. open `http://localhost:3000/admin`
  2. observe the destination route
  3. open `http://localhost:3000/admin/auth-error`
  4. confirm the page offers retry guidance and a safe return-home action
- **Expected Results**:
  - unexpected auth failures do not reuse the access-denied page
  - the page stays non-sensitive and project-owned

### Scenario 4: Allowlisted Account Reaches The Protected Shell
- **Description**: Verify an allowlisted Microsoft account can reach the protected admin shell
- **Setup**:
  - include the test account email in `AUTH_ALLOWED_EMAILS`
  - set `NEXTAUTH_URL` and `AUTH_URL` to the real host
- **Test Steps**:
  1. sign in with the allowlisted account
  2. confirm the app lands on `/admin`
  3. confirm the sidebar, welcome summary, profile card, and sign-out button render
- **Expected Results**:
  - protected content renders only after successful auth and allowlist approval
  - signed-in profile details appear in the shell

### Scenario 5: Non-Allowlisted Account Is Redirected To Access Denied
- **Description**: Verify authenticated but unauthorized users cannot enter the protected shell
- **Setup**:
  - use a Microsoft account not present in `AUTH_ALLOWED_EMAILS`
- **Test Steps**:
  1. sign in with the non-allowlisted account
  2. follow the callback back into the app
  3. observe the destination route
- **Expected Results**:
  - the user lands on `/admin/access-denied`
  - the denial page exposes only safe recovery actions
  - protected shell content never renders

### Scenario 6: Production Host Callback Behavior
- **Description**: Verify successful login and logout resolve against the real production host rather than localhost
- **Setup**:
  - set `NEXTAUTH_URL`, `AUTH_URL`, and `AUTH_TRUST_HOST=true`
  - run behind the same host or proxy model used in production
- **Test Steps**:
  1. sign in with an allowlisted account
  2. confirm the post-login redirect returns to `https://basijsenzo.duckdns.org/admin`
  3. click `Uitloggen`
  4. confirm the browser returns to `https://basijsenzo.duckdns.org/`
- **Expected Results**:
  - no redirect falls back to `localhost:3000` or `localhost:3030`

## Run Integration Checks

### Local Production Runtime
```bash
cd src/web && npm run build
cd src/web && npm start
```

### Docker Runtime
```bash
docker build -t basijsenzo:local ./src/web
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

## Cleanup
```bash
docker image rm basijsenzo:local
```
