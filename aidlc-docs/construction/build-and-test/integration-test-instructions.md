# Integration Test Instructions

## Purpose
For this single-unit web app, integration testing means validating that the built Next.js application, static content layer, assets, and runtime configuration all work together correctly.

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

### Scenario 2: Docker Runtime Serves The Same Experience
- **Description**: Verify the Dockerized runtime serves the same app successfully
- **Setup**:
  - Docker installed locally
- **Test Steps**:
  1. run `docker build -t basijsenzo:local ./src/web`
  2. run `docker run --rm -p 3000:3000 basijsenzo:local`
  3. open `http://localhost:3000`
  4. verify page behavior matches the local `cd src/web && npm start` experience
- **Expected Results**:
  - container starts cleanly
  - site loads successfully
  - key UI and assets render

## Run Integration Checks

### Local Production Runtime
```bash
cd src/web && npm run build
cd src/web && npm start
```

### Docker Runtime
```bash
docker build -t basijsenzo:local ./src/web
docker run --rm -p 3000:3000 basijsenzo:local
```

## Cleanup
```bash
docker image rm basijsenzo:local
```
