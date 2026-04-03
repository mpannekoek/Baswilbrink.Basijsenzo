# Technology Stack

## Programming Languages
- TypeScript - 5.9.3 - Application source, config typing, and content models
- JavaScript (ES modules) - runtime version from `node:24.11.0-alpine` - build scripts and config files
- CSS - Tailwind-powered global styling

## Frameworks
- Next.js - 16.2.1 - Application framework and App Router runtime
- React - 19.2.4 - Component rendering
- Tailwind CSS - 4.2.2 - Styling system

## Infrastructure
- Docker - pinned Node Alpine base image - containerized production packaging

## Build Tools
- npm - lockfile-managed package installation and script orchestration
- PostCSS - Tailwind pipeline integration
- ESLint - 9.39.4 - static linting

## Testing Tools
- Vitest - 4.1.2 - unit/component test runner
- Testing Library - 16.3.2 - DOM-centric assertions and interaction helpers
- jsdom - 29.0.1 - browser-like test environment
