# Build Instructions

## Prerequisites
- **Build Tool**: `npm` (project scripts in `src/web/package.json`)
- **Runtime**: Node.js 20+ (22 LTS recommended), npm 10+
- **System Requirements**:
- 2+ CPU cores
- 4 GB RAM minimum
- 2+ GB free disk space for dependencies and `.next` artifacts
- **Environment Variables** (from `src/web/.env.example`):
- `AUTH_SECRET`
- `AUTH_MICROSOFT_CLIENT_ID`
- `AUTH_MICROSOFT_CLIENT_SECRET`
- `AUTH_ALLOWED_EMAILS`
- `CONTENT_DB_PATH` (default: `./data/content.db`)

## Build Steps

### 1. Install Dependencies
```bash
cd src/web
npm ci
```

### 2. Configure Environment
```bash
cd src/web
cp .env.example .env.local
# Vul daarna de echte waarden in .env.local in
```

### 3. Prepare Content Store (Local Validation)
```bash
cd src/web
npm run db:migrate
npm run db:seed
```

### 4. Build Application
```bash
cd src/web
npm run build
```

### 5. Verify Build Success
- **Expected Output**:
- `next build` completes without errors
- postbuild script `scripts/prepare-standalone.mjs` completes
- **Build Artifacts**:
- `src/web/.next/`
- `src/web/.next/standalone/` (prepared for container/runtime usage)
- **Common Warnings**:
- framework warnings from Next.js can appear; treat build errors as blocking

## Troubleshooting

### Build Fails with Dependency Errors
- **Cause**: stale lockfile/cache or interrupted install.
- **Solution**:
1. Remove local install artifacts: `rm -rf src/web/node_modules`
2. Reinstall with `npm ci`
3. Retry `npm run build`

### Build Fails with Environment Errors
- **Cause**: missing or invalid auth/content env variables.
- **Solution**:
1. Recheck `src/web/.env.local` against `src/web/.env.example`
2. Ensure required secrets are present and non-empty
3. Retry build

### Build Fails with Type/Lint/Test Regressions
- **Cause**: incompatible recent code change.
- **Solution**:
1. Run `npm run lint`
2. Run `npm test`
3. Fix reported issues before rebuilding
