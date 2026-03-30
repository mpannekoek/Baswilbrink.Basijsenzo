# NFR Requirements Clarification - landing-page

I detected one contradiction that needs to be resolved before NFR requirements can be finalized.

## Contradiction 1: Docker Delivery Baseline
Earlier requirements state that the project should include a **production-oriented Docker setup** suitable for building and running the Next.js app in a container.

In the NFR plan, Question 4 was answered with:
- `C` = "Minimal baseline: just make sure the container runs"

These conflict because a minimal "just runs" container baseline is weaker than the previously approved production-oriented requirement.

## Clarification Question 1
Which Docker delivery expectation should I use going forward?

A) Keep the original production-oriented requirement and use a lean but production-ready Docker baseline
B) Downgrade the requirement and treat Docker as a minimal run-only setup
C) Keep production-oriented Docker, but limit it to a practical baseline without extra hardening or scanning work
X) Other (please describe after [Answer]: tag below)

[Answer]:C
