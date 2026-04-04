# E2E Test Instructions

## Purpose
Run practical manual smoke tests for both the visitor journey and the current admin-portal auth-observability journey.

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

## Scenario 3: Admin Sign-In Entry
1. open `http://localhost:3000/admin`
2. confirm you land on the custom `/admin/sign-in` page
3. confirm the page shows one clear `Sign in with Microsoft` action
4. start the Microsoft login flow

## Scenario 4: Admin Login Cancellation Or Failure
1. start from `http://localhost:3000/admin/sign-in`
2. begin Microsoft login
3. cancel the login at Microsoft or trigger a callback failure
4. confirm the app returns to a project-owned error state
5. confirm no raw provider or framework error page is exposed

## Scenario 5: Authorized Admin Journey
1. sign in with an allowlisted Microsoft account
2. confirm the app lands on `/admin`
3. confirm the dashboard shell shows the sidebar, profile summary, and welcome content
4. click the sign-out action
5. confirm the browser returns to `/`

## Scenario 6: Unauthorized Admin Journey
1. sign in with a Microsoft account not present in `AUTH_ALLOWED_EMAILS`
2. confirm the app redirects to `/admin/access-denied`
3. confirm the denial page shows safe recovery actions only
4. use the return-home or sign-out action and confirm recovery works

## Scenario 7: Unexpected Auth Error Journey
1. trigger an auth misconfiguration or controlled route failure
2. confirm the app redirects to `/admin/auth-error`
3. confirm the page offers retry guidance and a safe route back to the site
4. retry sign-in after fixing the issue

## Scenario 8: Production Host Redirect Check
1. run the deployed app at `https://basijsenzo.duckdns.org`
2. sign in successfully
3. confirm the post-login redirect returns to the production `/admin` route
4. click `Uitloggen`
5. confirm the logout redirect returns to the production `/` route instead of localhost

## Expected Outcome
- the landing page remains stable and mobile-friendly
- successful admin login remains project-owned and predictable
- unauthorized access uses `/admin/access-denied`
- unexpected auth problems use `/admin/auth-error`
- login and logout redirects resolve against the real production host when base-URL env vars are configured correctly
