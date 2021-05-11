# image-repo [![Build](https://github.com/obonobo/image-repo/actions/workflows/test.yml/badge.svg)](https://github.com/obonobo/image-repo/actions/workflows/test.yml)

Check out the live demo on AWS Amplify:
<https://main.dot4pvtqrzsbl.amplifyapp.com/>

I also deployed to GitHub Pages:
<https://obonobo.github.io/image-repo/>

Image repository for Shopify developer challenge.

I decided to try out some new techniques for this mini-project. In particular, I
explored AWS Lambda Functions, which is an Amazon service that I have not used
before. I completed the project in around 1 - 2 days time; so there are some
small shortcuts taken such as leaving out authentication (I will close this repo
shortly, or lock it behind an auth). Thus, the project is sort of "hackathon"
style ;)

`image-repo` is a small, cloud-based image repository using the following
architecture:

- AWS Lambda Functions:
  - `GET /images`: Retrieve a listing of images available in the repo.
  - `GET /images/{name}`: Retrieve an image by name.
  - `POST /images`: Add an image to the repo.
- AWS API GateWay
  - Public-facing interface for the lambda functions
  - Routes requests to AWS Lambda
- AWS Amplify
  - The client is deployed on AWS Amplify Jamstack-style.
- AWS Cloudformation
  - Configuration files that group our AWS resources into a unified "stack".
    Let's us deploy our app in an organized manner.
- Serverless Framework
  - A very cool framework that I discovered for managing AWS serverless-related
    resources such as Lambda Functions, API Gateway, and CloudFormation files.
- Next.js static web client
  - A small TypeScript React web client to demo the Lambda backend.
- Continuous Integration and Continuous Deployment
  - Lately, I have really been getting into GitHub Actions - I write pipelines
    for all my projects.
  - For this repo, we have two pipelines:
    1. Run tests
       - <https://github.com/obonobo/image-repo/actions/workflows/test.yml>
       - This workflow runs the unit tests for both the `client/` and `server/`
         applications.
    2. Deploy site
       - <https://github.com/obonobo/image-repo/actions/workflows/deploy-site.yml>
       - Depends on passing tests, builds the client and deploys to GitHub Pages
       - NOTE: I have also configure deployment to AWS Amplify (for the client
         app) as well as for AWS Lambda (+ api gateway, etc.) for the server app.

## Improvements

- Auth
  - Another feature that I wanted to add was AWS Cognito.
  - The API should be locked behind an auth token.
  - There is no auth on the repo, so basically anybody has open access to this
    test environment (I will be locking it down and/or tearing down the public
    API soon)
