# User Stories

## Story Approach
- **Structure**: Hybrid
- **Primary Organization**: Capability-based stories aligned to protected access, denial handling, and dashboard foundation
- **Validation Lens**: Journey-aware acceptance criteria that protect the sign-in, denial, and successful-entry flows
- **Security Emphasis**: Acceptance criteria explicitly cover protected-route enforcement and allowlist denial behavior
- **Dashboard Scope Policy**: The initial dashboard remains intentionally lightweight and acts as a foundation for later portal logic

## INVEST Notes
- **Independent**: Each story targets a distinct access or portal outcome
- **Negotiable**: Exact visual treatment and copy can evolve while preserving the core user outcome
- **Valuable**: Every story maps to a concrete user or security-sensitive behavior
- **Estimable**: Scope is bounded to the first admin slice
- **Small**: Stories avoid later portal business logic
- **Testable**: Each story has observable acceptance criteria

## US-1: Protected Admin Entry
**As an** allowed Bas IJs & Zo admin user or an unauthenticated requester  
**I want** `/admin` to enforce sign-in correctly  
**So that** only authenticated users can proceed toward the protected portal

**Primary Personas**: Beheerder Britt, Bezoeker Zonder Sessie Sam

**Acceptance Criteria**
- Requests to `/admin` require authentication before protected content is rendered.
- Unauthenticated requests to `/admin` redirect into the Microsoft sign-in flow.
- The first version exposes Microsoft as the only sign-in method.
- The sign-in path remains within the existing Next.js application structure and does not disrupt the public landing page.
- Protected-route enforcement is treated as a server-side security boundary, not only a client-side UI convention.

## US-2: Unauthorized Account Denial
**As an** authenticated Microsoft user who is not on the allowed list  
**I want** to receive a clear access-denied outcome  
**So that** I understand I signed in successfully but still do not have permission to use the portal

**Primary Personas**: Niet-Toegestane Noor

**Acceptance Criteria**
- Successfully authenticated Microsoft users who are not allowlisted cannot access protected admin content.
- Unauthorized users are redirected to a dedicated access-denied page.
- The access-denied experience explains the authorization failure clearly without exposing sensitive internal details.
- The access-denied page provides at least one safe next action such as signing out or returning to the public site.
- Unauthorized users are not able to bypass the denial path by directly requesting protected admin routes.

## US-3: Admin Dashboard Foundation
**As an** allowed admin user  
**I want** a simple dashboard shell after sign-in  
**So that** I can confirm I am inside the portal and see the starting point for future admin functionality

**Primary Personas**: Beheerder Britt

**Acceptance Criteria**
- The `/admin` area renders a dashboard-style shell with a left sidebar and one dummy navigation item.
- The main content area renders a lightweight placeholder panel for future functionality.
- The dashboard shell feels more restrained and utility-focused than the public marketing page while still using the Bas IJs & Zo brand anchors.
- The shell is structured so additional admin routes or modules can be added later without redesigning the foundation.
- The initial dashboard stays intentionally lightweight and does not attempt to implement future portal business logic yet.

## US-4: Signed-In Context And Exit
**As an** allowed admin user  
**I want** to see who is signed in and how to sign out  
**So that** I can trust the current session and leave the admin area safely when finished

**Primary Personas**: Beheerder Britt

**Acceptance Criteria**
- The initial dashboard displays basic signed-in user profile information.
- The initial dashboard includes a welcome summary or equivalent orientation text.
- The admin area includes a sign-out control.
- Session behavior uses secure defaults suitable for the first protected portal version.
- The sign-out action returns the user to a sensible non-protected state without leaving protected content accessible.
