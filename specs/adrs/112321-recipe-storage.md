# Use Firebase as recipe storage service

- Status: Accepted
  Deciders: Punn, Dor, Jack
- Date: 2021-11-23

Technical Story: Decide on Storage Service

## Context and Problem Statement

{Describe the context and problem statement, e.g., in free form using two to three sentences. You may want to articulate the problem in form of a question.}

We had to decide how we were storing the recipes created by users to address our application specifications. Establishing the database and setting it up allows us to test the front-end/back-end with the database and ensure that all things are running smoothly before we continue with our sprints that may have more complex development. Additionally, we needed the database solution to be redundant and easy to use so we wouldn't need to setup many dependencies when we deploy the application.

## Decision Drivers

- Easy to use
- Simple integration
- Redundant
- Support collaboration

## Considered Options

- MySQL
- PostgreSQL
- Local storage
- AWS amplify
- Firebase

## Decision Outcome

Chosen option: Firebase, because it is very easy to integrate into backend application. Database structure is document-based so there will be minimal conflicts with data format. Works well with JSON data.

### Positive Consequences

- Free plan is extensive
- Auth APIs
- Well-documented
- Simple interface (console and functions)
- Real-time

### Negative Consequences

- Remote config was sometimes troublesome
- Firebase online console UI can be hard to navigate at times (too many services)

## Links

- {Firebase Website} {https://firebase.google.com/}
