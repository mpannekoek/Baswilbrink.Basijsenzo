# Build Instructions

## Prerequisites
- **Build Tool**: `npm` 11.9.0
- **Runtime**: `node` 24.14.0
- **Application Root**: `src/web`
- **Dependencies**: install from `src/web/package.json` and `src/web/package-lock.json`
- **Environment Variables**:
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
- **Expected Output**: successful Next.js production build with static page generation
- **Build Artifacts**:
  - `src/web/.next/`
  - `src/web/.next/standalone/` when standalone output is generated
- **Common Acceptable Notes**:
  - build output lists `/` and `/_not-found` as static routes

## Docker Build

### 1. Build The Production Image
```bash
docker build -t basijsenzo:local ./src/web
```

### 2. Run The Container
```bash
docker run --rm -p 3000:3000 basijsenzo:local
```

### 3. Verify Container Runtime
- Open `http://localhost:3000`
- Confirm the landing page loads
- Confirm the logo, hero, opening hours, and review section render correctly

## GitHub Actions GHCR Publish

### 1. Verify Workflow File Exists
- Confirm `.github/workflows/publish-image.yml` is present in the repository.
- Confirm the workflow builds the web app from the `src/web` application root.
- Confirm the Docker build context is `./src/web`.
- Confirm the Dockerfile path is `./src/web/Dockerfile`.

### 2. Verify Workflow Triggers
- Confirm the workflow is configured for:
  - pushes to `main`
  - optional manual dispatch
  - version tags if release tagging is later adopted

### 3. Verify Publish Permissions
- Confirm the workflow uses:
  - `contents: read`
  - `packages: write`

### 4. Verify Expected Image Naming
- Expected registry target:
  - `ghcr.io/mpannekoek/baswilbrink.basijsenzo`
- Expected tags include:
  - `latest` from `main`
  - `sha-<commit>` for immutable traceability

### 5. Verify Published Image
- After a successful workflow run, inspect the GHCR package in GitHub.
- Pull and run the image from GHCR:
```bash
docker pull ghcr.io/mpannekoek/baswilbrink.basijsenzo:latest
docker run --rm -p 3000:3000 ghcr.io/mpannekoek/baswilbrink.basijsenzo:latest
```

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
