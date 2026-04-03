# Requirements Clarification Questions For Admin Portal

Please answer the following questions by filling in the letter after each `[Answer]:` tag. If none of the listed options fit, choose `X` and describe your preference.

## Question 1
How should the list of allowed Microsoft accounts be managed in this first version?

A) Hardcode a small allowlist in environment variables or configuration for now
B) Store the allowlist in application code as placeholders for the first version
C) Persist the allowlist in a database or external store from the start
D) I want you to recommend the best approach during design
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 2
What should happen when an unauthenticated user visits `/admin`?

A) Redirect directly to the Microsoft sign-in flow
B) Show a simple admin login page with a "Sign in with Microsoft" action
C) Show a neutral landing page first, then let the user choose to sign in
D) Reuse the public site styling and place sign-in inline on the page
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 3
What should happen when an authenticated Microsoft user is not on the allowlist?

A) Deny access and redirect to a dedicated access-denied page
B) Deny access and show the message inline on the login page
C) Deny access and sign the user out immediately without explanation
D) Let the user in, but hide protected content until later
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 4
What session scope should I assume for the first version?

A) Standard Auth.js session handling with secure defaults is enough
B) Short-lived admin sessions with stricter expiration than defaults
C) Persistent sign-in for convenience unless the user signs out
D) I want you to recommend the best baseline for this admin portal
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 5
What should the initial admin dashboard contain besides layout scaffolding?

A) Only the shell: sidebar, one dummy nav item, and one dummy content panel
B) The shell plus basic profile info for the signed-in user
C) The shell plus a placeholder card set suggesting future modules
D) The shell plus sign-out control and a small welcome summary
X) Other (please describe after [Answer]: tag below)

[Answer]: B and D

## Question 6
How should the new admin area relate visually to the current public landing page?

A) Reuse the existing brand colors, but use a more restrained dashboard style
B) Keep the same design language almost exactly, just adapted to an admin layout
C) Build a separate admin visual language with only light brand references
D) I want you to recommend the best balance between brand continuity and admin usability
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 7
What delivery expectation should I use for this workflow?

A) Plan and implement the full first admin slice now if the scope is reasonable
B) Define requirements and design first, then wait before coding
C) Break this into multiple units because auth and dashboard should be separated
D) Explore options first and recommend the best architecture before implementation
X) Other (please describe after [Answer]: tag below)

[Answer]: A
