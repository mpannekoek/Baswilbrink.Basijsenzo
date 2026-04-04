# Tech Stack Decisions - admin-portal

## Core Framework
- **Decision**: Keep the auth-observability increment inside the existing Next.js application in `src/web`
- **Rationale**:
  - Matches the approved brownfield strategy
  - Avoids fragmenting the current admin auth flow into a second service
  - Preserves existing routing, deployment, and build behavior

## Authentication Framework
- **Decision**: Keep Auth.js as the authentication framework and extend the current implementation with diagnostics
- **Rationale**:
  - The working sign-in flow already exists on Auth.js
  - The current problem is diagnosability, not framework fit
  - Extending the existing integration reduces migration risk

## Logging Strategy
- **Decision**: Use lightweight structured server-side logs emitted to stdout or stderr
- **Included**:
  - event-oriented auth logs
  - masked user identifiers when relevant
  - request path
  - correlation or request ID when available
- **Excluded for this increment**:
  - local file logging
  - external logging SaaS integration
  - alerting or monitoring dashboards
- **Rationale**:
  - Matches the approved NFR answers
  - Fits the current deployment model
  - Provides production visibility without infrastructure expansion

## Correlation Strategy
- **Decision**: Include a correlation or request identifier when available, rather than relying only on timestamps
- **Rationale**:
  - Multi-step auth flows are easier to reconstruct when related events can be linked
  - This improves diagnosability without requiring a full tracing platform

## Privacy Strategy
- **Decision**: Use masked email identifiers and never log tokens, secrets, raw provider payloads, or full query strings
- **Rationale**:
  - Matches the approved NFR answers and enforced security rules
  - Preserves enough operator context while avoiding sensitive production log leakage

## Failure Handling Strategy
- **Decision**: Separate unexpected auth failures from unauthenticated and unauthorized outcomes
- **Rationale**:
  - The current production problem is that distinct auth failures can look the same
  - Explicit failure classes improve both operator troubleshooting and user clarity

## Logging Failure Strategy
- **Decision**: Logging failures must not break auth flow handling
- **Rationale**:
  - Matches the approved reliability choice
  - Prevents observability code from becoming a new auth outage source

## Error UX Strategy
- **Decision**: Provide a simple dedicated auth-error page or state with retry guidance and a safe navigation path
- **Rationale**:
  - Matches the approved NFR answer
  - Distinguishes unexpected auth failures from authorization denial without exposing internals

## Maintainability Strategy
- **Decision**: Keep auth logging and auth outcome classification in shared auth modules rather than embedding them into page components directly
- **Rationale**:
  - Aligns with the approved maintainability direction
  - Supports consistent behavior across route handlers, protected routes, and UI pages

## Dependency Strategy
- **Decision**: Prefer implementing the logging increment with existing platform capabilities and no heavy new dependencies unless clearly necessary
- **Rationale**:
  - Minimizes supply-chain and runtime complexity
  - Keeps the increment focused on behavior and diagnosability rather than platform expansion

## Testing Implications
- **Decision**: Expand tests toward auth outcome classification, auth-error rendering, and safe logging expectations while preserving existing admin and public-site checks
- **Rationale**:
  - This increment changes sensitive failure-path behavior
  - Regression coverage is more valuable here than deeper infrastructure work
