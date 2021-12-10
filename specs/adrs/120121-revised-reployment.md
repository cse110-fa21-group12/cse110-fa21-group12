# Use Heroku

- Status: Proposed
- Deciders: Tyler, Rajdeep, Natalie, Sam, Leland, Punn, Tarek
- Date: 2021-12-01

Technical Story: Decide on easy deployment service.

## Context and Problem Statement

Need to find an easy way to deploy our webapp. It must be applicable to github actions for automated deployment when pull-requests are made. We only need to deploy our backend as the backend is serving the frontend.

## Decision Drivers

- Easy to implement.
- Free of cost.

## Considered Options

- Heroku
- Firebase
- AWS
- Azure

## Decision Outcome

Chosen option: Heroku because it allows us to deploy our backend quickly and easily. It also has an option for automatic deployment (which we did not use because we created a Github Actions for it already).

### Positive Consequences

- Allows us to connect to our github repo directly.

### Negative Consequences

- Confusing to navigate the dashboard

## Links

- {Heroku Website} {https://www.heroku.com/}
