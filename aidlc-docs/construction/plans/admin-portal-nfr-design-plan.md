# NFR Design Plan - admin-portal

## Plan Progress
- [x] Review approved admin-portal NFR requirements and tech-stack decisions
- [x] Map the in-scope security rules to concrete design patterns for the admin boundary
- [x] Confirm whether additional NFR-design clarification questions are required
- [x] Generate `aidlc-docs/construction/admin-portal/nfr-design/nfr-design-patterns.md`
- [x] Generate `aidlc-docs/construction/admin-portal/nfr-design/logical-components.md`

## Unit Context
- **Unit Name**: `admin-portal`
- **Design Focus**: Translate approved security, maintainability, browser-support, and deployment-compatibility requirements into implementable auth and UI-boundary patterns inside the existing Next.js application
- **Next Stage If Approved**: `Code Generation`

## Question Assessment
- No additional clarification questions were required for this stage.
- The approved NFR requirements already fix the main design choices:
  - Auth.js with Microsoft-only sign-in
  - environment-backed allowlist authorization
  - standard secure session defaults
  - lightweight observability
  - no new infrastructure slice
