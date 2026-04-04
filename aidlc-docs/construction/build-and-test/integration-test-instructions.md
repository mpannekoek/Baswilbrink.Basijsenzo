# Integration Test Instructions

## Purpose
For this single-runtime web app, integration testing means validating that the built Next.js application, its static content, auth configuration, protected admin routes, and container packaging work together correctly.

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
- **Description**: Verify protected admin entry sends unauthenticated users to the custom `/admin/sign-in` route instead of the generic provider-selection screen
- **Setup**:
  - set `AUTH_SECRET`, `AUTH_MICROSOFT_CLIENT_ID`, `AUTH_MICROSOFT_CLIENT_SECRET`, and `AUTH_ALLOWED_EMAILS`
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

### Scenario 3: Cancelled Microsoft Login Returns To The Custom Sign-In Page
- **Description**: Verify Microsoft-login cancellation or callback failure returns the user to the project-owned sign-in experience
- **Setup**:
  - use the same local runtime as Scenario 2
- **Test Steps**:
  1. open `http://localhost:3000/admin/sign-in`
  2. start Microsoft sign-in
  3. cancel the Microsoft login flow
  4. observe the returned page
- **Expected Results**:
  - the browser returns to `/admin/sign-in`
  - the page shows the small auth-error state
  - no raw provider or framework error page is exposed

### Scenario 4: Allowlisted Account Reaches The Protected Shell
- **Description**: Verify an allowlisted Microsoft account can reach the protected admin shell
- **Setup**:
  - include the test account email in `AUTH_ALLOWED_EMAILS`
  - run the production app locally
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

### Scenario 6: Docker Runtime Serves The Same Public And Admin Entry Experience
- **Description**: Verify the Dockerized runtime serves the same routes successfully
- **Setup**:
  - Docker installed locally
- **Test Steps**:
  1. run `docker build -t basijsenzo:local ./src/web`
  2. run `docker run --rm -p 3000:3000 --env-file .env.local basijsenzo:local`
  3. open `http://localhost:3000`
  4. verify the public page behavior matches the local `npm start` experience
  5. verify `/admin/sign-in` and the unauthenticated `/admin` redirect still work
- **Expected Results**:
  - container starts cleanly
  - site loads successfully
  - public and admin-entry routes behave the same as the local production runtime

## Run Integration Checks

### Local Production Runtime
```bash
cd src/web && npm run build
cd src/web && npm start
```

### Docker Runtime
```bash
docker build -t basijsenzo:local ./src/web
docker run --rm -p 3000:3000 --env-file .env.local basijsenzo:local
```

## Cleanup
```bash
docker image rm basijsenzo:local
```
