# E2E Test Instructions

## Purpose
Run practical manual smoke tests for both the visitor journey and the first admin-portal journey.

## Scenario 1: First-Time Visitor Flow
1. open the homepage
2. confirm the hero creates a strong first impression
3. confirm one clear CTA is visible without scrolling
4. scroll to opening hours and confirm practical details are easy to scan
5. review the taste-of-the-week section
6. review the story section
7. review the reviews section
8. confirm the final visit/contact section repeats key actions

## Scenario 2: Mobile Visitor Flow
1. open the site in mobile emulation
2. confirm navigation and CTA buttons remain usable
3. confirm opening hours stay readable without zooming
4. confirm review cards and content blocks stack cleanly
5. confirm the footer/contact actions remain easy to tap

## Scenario 3: Route And Contact Smoke Check
1. click the call CTA and verify the phone link format is correct
2. click the route CTA and verify the map link opens correctly

## Scenario 4: Admin Sign-In Entry
1. open `http://localhost:3000/admin`
2. confirm you land on the custom `/admin/sign-in` page
3. confirm the page shows one clear `Sign in with Microsoft` action
4. start the Microsoft login flow

## Scenario 5: Admin Login Cancellation
1. start from `http://localhost:3000/admin/sign-in`
2. begin Microsoft login
3. cancel the login at Microsoft
4. confirm the app returns to `/admin/sign-in`
5. confirm the inline error state is shown without exposing framework internals

## Scenario 6: Authorized Admin Journey
1. sign in with an allowlisted Microsoft account
2. confirm the app lands on `/admin`
3. confirm the dashboard shell shows the sidebar, profile summary, and placeholder content
4. click the sign-out action
5. confirm the browser returns to `/`

## Scenario 7: Unauthorized Admin Journey
1. sign in with a Microsoft account not present in `AUTH_ALLOWED_EMAILS`
2. confirm the app redirects to `/admin/access-denied`
3. confirm the denial page shows safe recovery actions only
4. use the return-home or sign-out action and confirm recovery works

## Expected Outcome
- the page feels polished, warm, local, and mobile-friendly
- practical information is easy to access
- branding remains black/orange-led and does not drift toward the inspiration palette
- the admin sign-in and denial flows stay project-owned and understandable
- the protected shell appears only for allowlisted accounts
