# Requirements Clarification Questions For Authentication Logging

Please answer the following questions by filling in the letter after each `[Answer]:` tag. If none of the listed options fit, choose `X` and describe your preference.

## Question 1
Which authentication outcomes should be logged in this increment?

A) Only unexpected configuration, provider, or callback errors
B) All failed auth or authorization outcomes plus unexpected errors (recommended)
C) A full audit trail including successful sign-ins and sign-outs
X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 2
Where should the new logging go in the first version?

A) Structured server logs to stdout or stderr so the deployment platform can collect them (recommended)
B) Structured server logs plus a local file written by the application
C) An external logging or monitoring service must be added immediately
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 3
How much user identity information may appear in the logs?

A) Full Microsoft account email addresses may be logged for debugging
B) Only masked or hashed identifiers plus request or correlation context should be logged (recommended)
C) No user identifier should be logged at all
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 4
What should happen in the UI when authentication fails unexpectedly in production?

A) Keep the current generic denial or sign-in behavior and rely on logs only
B) Show a dedicated auth-error experience with a short non-sensitive message and retry guidance (recommended)
C) Always redirect back to `/admin/sign-in` with a generic retry message
X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 5
Should I add minimal success checkpoints to help reconstruct where a failure happened?

A) No, log failure cases only
B) Yes, log lightweight start, callback, success, and failure checkpoints without secrets (recommended)
C) Yes, log detailed provider payloads and session objects
X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 6
Should security extension rules remain enforced for this project?

A) Yes — enforce all SECURITY rules as blocking constraints (recommended for production-grade applications)
B) No — skip all SECURITY rules (suitable for PoCs, prototypes, and experimental projects)
X) Other (please describe after [Answer]: tag below)

[Answer]: A
