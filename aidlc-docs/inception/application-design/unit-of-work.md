# Unit of Work

## Unit Name
`landing-page-content-management`

## Why A Single Unit Exists
- Units Generation was intentionally skipped in Workflow Planning because this feature remains one coherent change inside a single application package.
- Functional Design still requires a unit boundary, so this document defines the implicit single unit used for construction stages.

## Unit Purpose
- Add a SQLite- and Drizzle-backed content-management capability for the landing page inside the existing authenticated admin portal.

## Unit Scope
- Database schema, migrations, and seed behavior for editable landing-page content
- Public content loading and metadata loading from the content store
- Protected admin query and update workflows
- Audit logging for content mutations
- Test updates related to the new content-management behavior

## Unit Boundaries
- Includes only the existing `src/web` application
- Excludes styling/layout editing, media management, and changes to code-managed URL/image configuration
- Excludes infrastructure topology changes outside the repository
