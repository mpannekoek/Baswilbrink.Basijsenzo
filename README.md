# Bas IJs & Zo

Repository for the Bas IJs & Zo landing page project.

## Overview

This project contains a single Next.js application for a Dutch ice cream parlor landing page. The implementation uses:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Docker for production-oriented containerization
- Vitest and Testing Library for lightweight UI verification

## Repository Structure

The web application root is [`src/web`](/home/martijn/dev/projects/baswilbrink/basijsenzo/src/web).

Key locations:

- [`src/web/app`](/home/martijn/dev/projects/baswilbrink/basijsenzo/src/web/app): Next.js App Router entrypoints
- [`src/web/components`](/home/martijn/dev/projects/baswilbrink/basijsenzo/src/web/components): landing-page and shared UI components
- [`src/web/lib`](/home/martijn/dev/projects/baswilbrink/basijsenzo/src/web/lib): content, metadata, and security helpers
- [`src/web/types`](/home/martijn/dev/projects/baswilbrink/basijsenzo/src/web/types): shared TypeScript models
- [`src/web/public`](/home/martijn/dev/projects/baswilbrink/basijsenzo/src/web/public): static assets
- [`src/web/tests`](/home/martijn/dev/projects/baswilbrink/basijsenzo/src/web/tests): test setup and landing-page tests
- [`aidlc-docs`](/home/martijn/dev/projects/baswilbrink/basijsenzo/aidlc-docs): AI-DLC planning, design, audit, and build/test artifacts

## Local Development

Install dependencies:

```bash
cd src/web && npm install
```

Start the development server:

```bash
cd src/web && npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

Run linting:

```bash
cd src/web && npm run lint
```

Run tests:

```bash
cd src/web && npm test
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

## Additional Documentation

Build, test, and design artifacts are tracked in [`aidlc-docs`](/home/martijn/dev/projects/baswilbrink/basijsenzo/aidlc-docs).
