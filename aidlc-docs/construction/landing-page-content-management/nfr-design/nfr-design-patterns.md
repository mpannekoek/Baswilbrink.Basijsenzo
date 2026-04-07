# NFR Design Patterns - landing-page-content-management

## Overview
This unit does not need heavyweight distributed-system patterns. The NFR design focuses on lightweight patterns that fit a single Next.js application with a local SQLite database and low-volume admin writes.

## Pattern 1: Server-Side Authorization Guard
- **Purpose**: Ensure every protected admin read/write path is denied by default unless the existing admin authorization logic allows it.
- **Applied To**:
  - protected admin pages
  - protected server actions
- **Design Effect**:
  - keep authorization checks in existing auth helpers
  - re-check authorization at mutation time, not only page-render time

## Pattern 2: Centralized Server-Side Validation
- **Purpose**: Ensure all submitted content is validated at the trust boundary before persistence.
- **Applied To**:
  - grouped content form submissions
  - opening-hours submissions
  - featured-taste submissions
- **Design Effect**:
  - one validation layer shared by mutation services
  - plain-text normalization or rejection of unsafe HTML/script input
  - explicit length and structure checks

## Pattern 3: Atomic Mutation Workflow
- **Purpose**: Prevent partial successful writes for a single save operation.
- **Applied To**:
  - grouped content update saves
  - opening-hours update saves
  - featured-taste update saves
- **Design Effect**:
  - treat each save as one protected mutation workflow
  - persist business changes and audit records together
  - fail closed rather than leaving inconsistent state

## Pattern 4: Audit-First Mutation Trail
- **Purpose**: Preserve accountability for privileged content changes.
- **Applied To**:
  - all successful content mutations
- **Design Effect**:
  - capture actor, target section/page, timestamp, before snapshot, and after snapshot
  - keep audit storage server-side only
  - keep audit writing part of the same mutation workflow

## Pattern 5: Read/Write Separation
- **Purpose**: Keep public rendering and admin editing concerns isolated.
- **Applied To**:
  - public content service
  - admin query service
  - admin mutation service
- **Design Effect**:
  - public reads stay simple and read-only
  - admin writes go through explicit orchestration layers
  - mapper logic is shared without coupling UI to persistence

## Pattern 6: Canonical Mapping Boundary
- **Purpose**: Maintain one authoritative translation between normalized storage and `LandingPageContent`.
- **Applied To**:
  - public page reads
  - metadata reads
  - admin form projections
- **Design Effect**:
  - minimize drift between public rendering and admin readback
  - make future field additions localized to schema + mapper updates

## Pattern 7: Seed-Only-When-Empty Initialization
- **Purpose**: Ensure first-time setup works without risking overwrite of later edits.
- **Applied To**:
  - database initialization and seed execution
- **Design Effect**:
  - emptiness check before seed insert
  - one-way bootstrap path
  - no recurring overwrite behavior

## Pattern 8: Post-Write Freshness Revalidation
- **Purpose**: Ensure public readers see updated content after admin saves.
- **Applied To**:
  - every successful content mutation
- **Design Effect**:
  - revalidate affected public routes and metadata-dependent reads
  - avoid manual restarts or rebuild-driven freshness

## Pattern 9: Controlled Failure Exposure
- **Purpose**: Protect end users and admins from raw internal errors.
- **Applied To**:
  - public reads
  - admin writes
- **Design Effect**:
  - generic user-facing error handling
  - no database internals, stack traces, or internal file paths in responses
  - structured server-side logging for diagnosis

## Pattern 10: Minimal-Dependency Continuity
- **Purpose**: Limit operational and supply-chain complexity.
- **Applied To**:
  - persistence stack
  - testing stack
  - routing model
- **Design Effect**:
  - retain Next.js App Router and Auth.js foundations
  - add only SQLite/Drizzle-related dependencies needed for the feature
  - keep tests in the existing Vitest ecosystem

## Category Coverage Notes
- **Resilience patterns**: Atomic mutation workflow, audit-first trail, controlled failure exposure
- **Scalability patterns**: Normalized storage and canonical mapping boundary support future field growth without distributed scaling complexity
- **Performance patterns**: Lightweight read path, focused revalidation, no unnecessary network round-trips for admin writes
- **Security patterns**: Authorization guard, centralized validation, audit-first mutation trail
- **Logical component direction**: Defined in the matching logical-components artifact
