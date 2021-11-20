# Use Netlify

- Status: Proposed
- Deciders: Tyler, Rajdeep, Natalie, Sam, Leland, Punn, Tarek
- Date: 2021-11-14

Technical Story: Decide on easy deployment service.

## Context and Problem Statement

Need to find an easy way to deploy our webapp. It must be applicable to github actions for automated deployment when pull-requests are made.

## Decision Drivers

- Easy to implement.
- Free of cost.

## Considered Options

- Heroku
- Firebase
- AWS
- Azure

## Decision Outcome

Chosen option: "Netlify", because it’s been the easiest to use as of now. Is available on github marketplace.

### Positive Consequences

- Allows us to connect to our github repo directly.

### Negative Consequences

- Error on deployment as of now.Works from their website

## Links

- {Heroku Website} {https://www.netlify.com/}
