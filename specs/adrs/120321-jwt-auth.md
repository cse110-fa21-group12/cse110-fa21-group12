# Use JWT for authenticating users

- Status: Accepted
  Deciders: Punn, Dor
- Date: 2021-12-03

Technical Story: Decide on authentication implementation

## Context and Problem Statement

{Describe the context and problem statement, e.g., in free form using two to three sentences. You may want to articulate the problem in form of a question.}

We wanted to implement registration and login for users to view their own recipes. We were searching for a way to implement authentication easily, without requiring much experience in cryptography. The authentication implementation should be secure enough to prevent people from entering others' accounts. However, it does not have to be ultra-secure as the stakes of the program are not high. We want easy setup and minimal dependencies required.

## Decision Drivers

- Easy to use
- Simple integration
- Secure

## Considered Options

- JWT
- Firebase Auth
- PassportJS

## Decision Outcome

Chosen option: JWT was chosen because it was the most simple and easy to integrate library out of the above options. It also didn't require payment, which was the case for Firebase Auth. JWT is also time-tested and known to be reliable

### Positive Consequences

- Scalable as verification don't take long for multiple concurrent users
- Flexibile as it could be used across multiple servers if wanted
- Secure because only secret keys are able to validate authentication

### Negative Consequences

- Compromised secret keys will result in easy access by hackers (only one key)
- Size of the token is quite large and may hamper loading speeds and storage space
- Requires users to reauth frequently as it has a short lifespan

## Links

- {Firebase Website} {https://firebase.google.com/}
