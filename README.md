# image-repo

Check out the live demo: <https://main.durd9urlnguo0.amplifyapp.com/>

Image repository for Shopify developer challenge.

I decided to try out some new techniques for this mini-project. In particular, I
explored AWS Lambda Functions, which is an Amazon service that I have not used
before. I completed the project in around 1 days time - so there are some small
shortcuts taken such as leaving out a lot of error handling, and enforcing no
authentication (I will close this repo shortly, or lock it behind an auth).
Thus, the project is sort of "hackathon" style ;)

`image-repo` is a small, cloud-based image repository using the following
architecture:

- AWS Lambda Functions:
  - `GET /images`: Retrieve a listing of images available in the repo.
  - `GET /images/{name}`: Retrieve an image by name.
  - `POST /images`: Add an image to the repo.
- AWS API GateWay
  - Public-facing interface for the lambda functions
  - Routes requests to AWS Lambda
- Next.js static web client
  - A small TypeScript React web client to demo the Lambda backend.
- AWS Amplify
  - The client is deployed on AWS Amplify Jamstack-style.

## Improvements

- Serverless frameworks
  - One thing I would definitely do differently on my next serverless project is
    to use a full-fledged serverless framework.
  - Developing plain lambda functions was a pain; I didn't really get to
    configure my environment properly for serverless dev - I was just manually
    uploading zip files.
- Build step
  - I'm new to serverless, so I don't yet have a good setup for build serverless
    functions with TypeScript and all the goodies. Basically, I was just doing
    them in plain JavaScript with not much more than the `aws-sdk` that comes in
    by default.
- Testing
  - I didn't get around to writing unit tests for the repo - I got caught up
    trying to configure the serverless.
  - Using a serverless framework would probably make it easier to integrate a
    testing phase into this project.
- Auth
  - Another feature that I wanted to add was AWS Cognito
  - There is no auth on the repo, so basically anybody has open access to this
    test environment.
  - The API should be locked behind an auth token.
