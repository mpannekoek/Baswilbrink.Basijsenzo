# Infrastructure Design - landing-page

## Scope
This infrastructure design covers the runtime and delivery shape for a single public Next.js landing page hosted in a Docker container.

## Infrastructure Summary
- **Compute Model**: Single containerized Next.js application runtime
- **Build Model**: Container image built from the application source
- **Publish Model**: GitHub Actions workflow publishes the image to GHCR
- **Delivery Style**: Production-oriented but practical Docker packaging
- **Statefulness**: Stateless application container
- **Data Storage**: None required for v1

## Infrastructure Components

### 1. Application Container
- **Purpose**: Run the production Next.js application
- **Responsibilities**:
  - serve the compiled application
  - expose the application port
  - run with production settings
- **Notes**:
  - no sidecar services are required
  - container should be lean and maintainable

### 2. Container Build Pipeline
- **Purpose**: Produce a deployable runtime image from source
- **Responsibilities**:
  - install dependencies
  - run production build
  - package runtime assets cleanly
- **Notes**:
  - production image tags should not use unpinned `latest`
  - build path should be deterministic and repeatable

### 3. Image Publish Pipeline
- **Purpose**: Publish the built runtime image to GitHub Container Registry
- **Responsibilities**:
  - authenticate to GHCR using GitHub Actions permissions
  - generate repository-derived image names and tags
  - publish commit-traceable and branch-default tags
- **Notes**:
  - workflow should be repository-local under `.github/workflows/`
  - pipeline remains lightweight and does not expand into broader release orchestration

### 4. Runtime Configuration Surface
- **Purpose**: Supply environment-specific values without code changes
- **Responsibilities**:
  - support runtime port configuration
  - support Node environment configuration
  - support future public metadata or contact overrides if needed
- **Notes**:
  - keep required runtime variables minimal for v1

### 5. Security Header Configuration
- **Purpose**: Enforce required public-site security headers
- **Responsibilities**:
  - apply CSP and related response headers at framework level
  - keep security policy centralized and auditable
- **Notes**:
  - no separate API gateway or reverse proxy requirement is introduced here

### 6. Static Asset Layer
- **Purpose**: Deliver bundled application assets such as logo and images
- **Responsibilities**:
  - package required local assets into the built app
  - keep assets optimized enough for public delivery
- **Notes**:
  - no external asset storage service is required for v1

## Infrastructure Decisions
- Use a single deployable application container rather than multiple services.
- Keep the app stateless so deployment remains portable and simple.
- Avoid introducing a database, cache, queue, or background worker because the landing page does not need them.
- Keep deployment generic enough to run on any container-capable host.
- Treat Docker as the deployment baseline, not just a local development convenience.
- Treat GHCR as the default image registry for automated publishing from GitHub.

## Security Considerations
- Configure required HTTP security headers in the application.
- Avoid exposing debug mode or internal stack details in production.
- Use committed lock files and disciplined image tagging.
- No authentication, authorization, or encrypted storage layer is needed for v1 because there is no user data workflow.

## Observability And Operations
- Advanced monitoring, alerting, and centralized log infrastructure are out of scope.
- Basic container logs and framework logs are sufficient for this version.
- Healthcheck support is recommended if supported cleanly by the final Docker setup.

## Out Of Scope
- Kubernetes or orchestrated multi-container deployments
- CDN configuration
- Managed database or object storage
- Load balancer design
- Multi-region or high-availability topology
- Image scanning pipeline design
