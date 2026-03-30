# Deployment Architecture - landing-page

## Architecture Overview
The Bas IJs & Zo site is deployed as a single stateless Docker container running the production Next.js application. GitHub Actions builds and publishes the image to GHCR, and the runtime host pulls that published image. The architecture is intentionally minimal and portable.

## Deployment Flow
1. Source code and assets are built into a production-ready Next.js application.
2. A GitHub Actions workflow builds the Docker image from the repository source.
3. The workflow publishes the image to GHCR with traceable tags.
4. The container is started in a production environment by pulling the published GHCR image with minimal runtime configuration.
5. The app serves the landing page and bundled assets directly.

## Logical Deployment Diagram

### Text Representation
- **Source Repository**
  - Next.js application code
  - local assets such as logo and implementation images
  - Docker configuration
- **CI Build And Publish Stage**
  - GitHub Actions workflow
  - dependency install
  - production build
  - runtime image creation
  - GHCR publish
- **Registry Stage**
  - GHCR package for the repository image
- **Runtime Stage**
  - single application container
  - exposed HTTP port
  - framework-level security headers
- **End User**
  - mobile and desktop visitors access the public landing page

## Runtime Characteristics
- **Topology**: Single container
- **Scaling Model**: Manual or host-level scaling if needed later
- **Persistence**: None
- **Secrets Requirement**: Minimal to none for v1
- **Portability**: Can run on any standard container host

## Deployment Constraints
- The runtime must remain production-oriented, not dev-server based.
- The image should stay lean and maintainable.
- The deployment design should not assume a specific cloud provider.
- The publish workflow should rely on standard GitHub-hosted automation and GHCR rather than custom release infrastructure.
- The architecture should preserve a clean path to later additions such as reverse proxying or managed hosting if requirements evolve.

## Future Evolution Path
If the project grows later, the following can be added without redesigning the core app:
- reverse proxy or ingress layer
- CDN/static caching layer
- container orchestration
- richer observability and deployment automation
