# Personas

## Persona 1: Beheerder Britt
- **Type**: Allowed admin user
- **Profile**: Runs or supports Bas IJs & Zo operations and needs access to a future admin portal through a personal Microsoft account that has been explicitly approved.
- **Primary Needs**:
  - Reach the protected admin area without confusing extra steps
  - Recognize immediately that sign-in succeeded and the portal is ready
  - See enough account context to trust that the correct user is signed in
  - Have a clear sign-out path
- **Device Context**: Mostly desktop or laptop, but should still be able to access the shell on smaller screens
- **Success Signal**: Can reach `/admin`, understand the dashboard shell, and confirm signed-in status within moments

## Persona 2: Niet-Toegestane Noor
- **Type**: Authenticated but unauthorized Microsoft user
- **Profile**: Can complete Microsoft sign-in, but is not part of the configured allowlist for the admin portal.
- **Primary Needs**:
  - Understand clearly that authentication succeeded but authorization failed
  - Avoid being trapped in a confusing loop between sign-in and denial
  - Have a clear next action such as signing out or returning to the public site
- **Device Context**: Any device capable of completing Microsoft sign-in
- **Success Signal**: Receives a direct, understandable denial outcome without seeing protected admin content

## Persona 3: Bezoeker Zonder Sessie Sam
- **Type**: Unauthenticated user requesting a protected route
- **Profile**: Opens `/admin` without an active session, either intentionally or accidentally.
- **Primary Needs**:
  - Be redirected predictably into the intended sign-in flow
  - Avoid seeing broken, partial, or misleading protected UI
- **Device Context**: Any browser, often through a bookmarked or manually entered admin URL
- **Success Signal**: Is redirected into the Microsoft sign-in flow with no ambiguity about how to continue

## Persona-to-Story Mapping
- **Beheerder Britt**: US-1, US-3, US-4
- **Niet-Toegestane Noor**: US-2
- **Bezoeker Zonder Sessie Sam**: US-1
