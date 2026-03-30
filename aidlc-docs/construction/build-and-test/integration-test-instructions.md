# Integration Test Instructions

## Purpose
For this single-unit web app, integration testing means validating that the built Next.js application, static content layer, assets, and runtime configuration all work together correctly.

## Test Scenarios

### Scenario 1: Built App Serves Complete Landing Page
- **Description**: Verify the production build serves the full landing page with all major sections
- **Setup**:
  - install dependencies
  - run a production build
- **Test Steps**:
  1. run `npm run build`
  2. run `npm start`
  3. open `http://localhost:3000`
  4. verify hero, opening hours, story, taste of the week, reviews, and visit/contact sections render
- **Expected Results**:
  - no runtime crash
  - all major content blocks appear
  - the real logo loads from `public/logo.png`

### Scenario 2: Docker Runtime Serves The Same Experience
- **Description**: Verify the Dockerized runtime serves the same app successfully
- **Setup**:
  - Docker installed locally
- **Test Steps**:
  1. run `docker build -t basijsenzo:local .`
  2. run `docker run --rm -p 3000:3000 basijsenzo:local`
  3. open `http://localhost:3000`
  4. verify page behavior matches the local `npm start` experience
- **Expected Results**:
  - container starts cleanly
  - site loads successfully
  - key UI and assets render

## Run Integration Checks

### Local Production Runtime
```bash
npm run build
npm start
```

### Docker Runtime
```bash
docker build -t basijsenzo:local .
docker run --rm -p 3000:3000 basijsenzo:local
```

## Cleanup
```bash
docker image rm basijsenzo:local
```
