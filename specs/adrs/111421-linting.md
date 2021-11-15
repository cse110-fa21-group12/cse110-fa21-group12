# Use ESLint

- Status: Accepted
- Deciders: Natalie, Rajdeep, Sam, Leland, Punn, Tyler
- Date: 2021-11-14

Technical Story: Decide on linter for the pipeline

## Context and Problem Statement

We had to decide on a linter to use in our pipeline in order to help find problems and fix them in our Javascript code. We wanted to find a linter that we can use in GitHub actions and that would be fairly easy and straightforward to implement.

## Decision Drivers

- Works with GitHub actions
- Easy to use
- Good documentation

## Considered Options

- JSLint
- ESLint
- standardJS

## Decision Outcome

Chosen option: ESLint, because it seems to be easy to use with GitHub actions and is widely used.

## Links

- {ESLint Website} {https://eslint.org/}
