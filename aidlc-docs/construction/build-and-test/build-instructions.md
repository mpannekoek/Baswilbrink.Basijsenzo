# Build Instructions

## Prerequisites
- **Build Tool**: `npm` 11.9.0
- **Runtime**: `node` 24.14.0
- **Dependencies**: install from `package.json` and `package-lock.json`
- **Environment Variables**:
  - optional: `PORT` for runtime override
- **System Requirements**:
  - Node.js 24+
  - npm 11+
  - network access for first-time dependency installation

## Build Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Build The Application
```bash
npm run build
```

### 3. Verify Build Success
- **Expected Output**: successful Next.js production build with static page generation
- **Build Artifacts**:
  - `.next/`
  - `.next/standalone/` when standalone output is generated
- **Common Acceptable Notes**:
  - build output lists `/` and `/_not-found` as static routes

## Docker Build

### 1. Build The Production Image
```bash
docker build -t basijsenzo:local .
```

### 2. Run The Container
```bash
docker run --rm -p 3000:3000 basijsenzo:local
```

### 3. Verify Container Runtime
- Open `http://localhost:3000`
- Confirm the landing page loads
- Confirm the logo, hero, opening hours, and review section render correctly

## Troubleshooting

### Build Fails During Dependency Install
- **Cause**: packages missing or network unavailable
- **Solution**:
  1. verify internet access
  2. rerun `npm install`
  3. ensure `package-lock.json` is present and not corrupted

### Build Fails During Type Checking
- **Cause**: TypeScript or Next.js config drift
- **Solution**:
  1. run `npm run lint`
  2. inspect the reported file
  3. fix the type or config issue
  4. rerun `npm run build`
