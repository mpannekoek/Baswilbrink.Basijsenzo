# Application Design Plan

## Planned Steps
- [x] Review requirements, user stories, and execution-plan context
- [x] Confirm content storage structure
- [x] Confirm protected write orchestration pattern
- [x] Confirm audit-detail level for content updates
- [x] Generate `aidlc-docs/inception/application-design/components.md`
- [x] Generate `aidlc-docs/inception/application-design/component-methods.md`
- [x] Generate `aidlc-docs/inception/application-design/services.md`
- [x] Generate `aidlc-docs/inception/application-design/component-dependency.md`
- [x] Generate `aidlc-docs/inception/application-design/application-design.md`
- [x] Validate design completeness and consistency

## Design Focus
- Keep the solution minimal inside the existing `src/web` application.
- Preserve the current landing-page component tree and existing Auth.js access boundary.
- Introduce clear boundaries between:
  - database schema and low-level persistence,
  - content mapping and query operations,
  - public rendering,
  - protected admin editing workflows.

## Mandatory Artifacts To Produce
- [x] `components.md` with component definitions and high-level responsibilities
- [x] `component-methods.md` with high-level method signatures and I/O
- [x] `services.md` with service definitions and orchestration patterns
- [x] `component-dependency.md` with dependency relationships and communication patterns
- [x] `application-design.md` consolidating the design

## Planning Questions

Please fill in the `[Answer]:` tags below so I can finalize the application design.

## Question 1
How should the editable landing-page content be stored in the database for the first version?

A) A normalized key/value content-entry model keyed by section and field, with separate rows for repeated items like opening hours and reviews (recommended)
B) A single JSON document row for most content, plus separate rows for repeated items
C) One row per section, each with a JSON payload
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 2
How should protected content updates be orchestrated in the existing Next.js app?

A) Server actions attached to protected admin pages, using shared server-side services for validation and persistence (recommended)
B) Dedicated protected route handlers/API endpoints under the admin area, with forms posting to those endpoints
C) A mix of server actions and route handlers, depending on the page
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 3
What audit detail level do you want for content updates in this first version?

A) Record actor, section/page, and update timestamp only
B) Record actor, section/page, timestamp, and before/after value snapshots for each save (recommended)
C) Record actor, section/page, timestamp, plus only the final stored values
X) Other (please describe after [Answer]: tag below)

[Answer]: B
