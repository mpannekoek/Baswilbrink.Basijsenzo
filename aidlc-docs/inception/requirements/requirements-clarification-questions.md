# Requirements Clarification Questions For Authentication Logging

I detected one security-related contradiction that needs clarification before the requirements can be finalized.

## Contradiction 1: Identity logging vs enforced security rules
You answered `A` for Question 3 in `requirement-verification-questions.md`, which allows full Microsoft account email addresses to appear in logs for debugging.  
At the same time, you answered `A` for Question 6, which keeps the Baseline Security Rules enabled as blocking constraints. Those rules require production logging to avoid PII in log output.

## Clarification Question 1
How should authentication logs identify users while keeping the security extension enforced?

A) Use masked email addresses in logs, such as `m***@example.com`
B) Use a one-way hashed identifier derived from the email address
C) Do not log user identifiers; log only request and auth event context
X) Other (please describe after [Answer]: tag below)

[Answer]: A
