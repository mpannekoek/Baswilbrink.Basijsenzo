# Bas IJs & Zo

Repository for the Bas IJs & Zo website and admin content-management project.

## Overview

This project contains a single Next.js application for a Dutch ice cream parlor website with a protected admin portal for managing editable homepage content. The implementation uses:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Auth.js with Microsoft sign-in for the admin portal
- SQLite + Drizzle ORM for editable content storage
- Swiper for the homepage gallery experience
- Docker for production-oriented containerization
- Vitest and Testing Library for lightweight UI verification

## Repository Structure

The web application root is [`src/web`](/home/martijn/dev/projects/baswilbrink/basijsenzo/src/web).

Key locations:

- [`src/web/app`](/home/martijn/dev/projects/baswilbrink/basijsenzo/src/web/app): Next.js App Router entrypoints
- [`src/web/components`](/home/martijn/dev/projects/baswilbrink/basijsenzo/src/web/components): landing-page and shared UI components
- [`src/web/lib`](/home/martijn/dev/projects/baswilbrink/basijsenzo/src/web/lib): content, metadata, auth, database, and security helpers
- [`src/web/types`](/home/martijn/dev/projects/baswilbrink/basijsenzo/src/web/types): shared TypeScript models
- [`src/web/public`](/home/martijn/dev/projects/baswilbrink/basijsenzo/src/web/public): static assets
- [`src/web/tests`](/home/martijn/dev/projects/baswilbrink/basijsenzo/src/web/tests): test setup plus landing-page, admin, and content-management tests
- [`deploy`](/home/martijn/dev/projects/baswilbrink/basijsenzo/deploy): VPS deploy script and Docker Compose definition
- [`.github/workflows`](/home/martijn/dev/projects/baswilbrink/basijsenzo/.github/workflows): image publish and VPS deployment workflows

## Local Development

Install dependencies:

```bash
cd src/web && npm install
```

Or use the repository helper script:

```bash
./scripts/dev.sh
```

This installs dependencies for `src/web` and starts the Next.js development server from the app root.

Start the development server:

```bash
cd src/web && npm run dev
```

Open `http://localhost:3000`.

The public site reads editable content from SQLite. On first run, the app seeds default content automatically if the content store is empty.

### Admin Portal Environment

The protected `/admin` slice relies on Auth.js with Microsoft personal-account sign-in. Set these
environment variables before testing the admin route locally:

```bash
AUTH_SECRET=replace-with-a-long-random-secret
AUTH_MICROSOFT_CLIENT_ID=your-microsoft-app-client-id
AUTH_MICROSOFT_CLIENT_SECRET=your-microsoft-app-client-secret
AUTH_ALLOWED_EMAILS=admin1@example.com,admin2@example.com
```

`AUTH_ALLOWED_EMAILS` is a comma-, space-, newline-, or semicolon-separated allowlist. The admin
portal uses the Microsoft `consumers` tenant, so the first slice is limited to personal Microsoft
accounts.

### Admin Auth Diagnostics

The admin authentication flow now emits lightweight structured server logs for production
troubleshooting. These logs:

- are emitted to stdout or stderr for platform collection
- distinguish unauthenticated, unauthorized, unavailable, authorized, and unexpected auth failures
- use masked email identifiers only when user context is helpful
- never log secrets, tokens, raw provider payloads, or full auth-sensitive query strings

Unexpected authentication failures route to a dedicated `/admin/auth-error` experience, while
authorization denial remains on `/admin/access-denied`.

## Quality Checks

Run linting:

```bash
cd src/web && npm run lint
```

Run tests:

```bash
cd src/web && npm test
```

Generate Drizzle files:

```bash
cd src/web && npm run db:generate
```

Apply database migrations:

```bash
cd src/web && npm run db:migrate
```

Seed default content manually:

```bash
cd src/web && npm run db:seed
```

Create a production build:

```bash
cd src/web && npm run build
```

Run the production server locally:

```bash
cd src/web && npm start
```

## Docker

Build the production image from the app root:

```bash
docker build -t basijsenzo:local ./src/web
```

Run the container:

```bash
docker run --rm -p 3000:3000 basijsenzo:local
```

For the admin portal to work in a container, provide the same auth-related environment variables documented above.

## Production Deployment

Container publishing and VPS deployment are handled through GitHub Actions:

- [`.github/workflows/publish-image.yml`](/home/martijn/dev/projects/baswilbrink/basijsenzo/.github/workflows/publish-image.yml): builds and publishes the production image to GHCR
- [`.github/workflows/deploy-azure-vps.yml`](/home/martijn/dev/projects/baswilbrink/basijsenzo/.github/workflows/deploy-azure-vps.yml): deploys a selected image tag to the VPS
- [`deploy/deploy.sh`](/home/martijn/dev/projects/baswilbrink/basijsenzo/deploy/deploy.sh): runs on the VPS and executes the Docker Compose deployment
- [`deploy/compose.yml`](/home/martijn/dev/projects/baswilbrink/basijsenzo/deploy/compose.yml): defines the production container, bind mounts, and runtime environment

The VPS deployment defaults to publishing the container on host port `3001` while the application itself continues listening on container port `3000`.
