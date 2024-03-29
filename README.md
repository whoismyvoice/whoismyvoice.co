# Who Is My Voice

Build made for house and senate bills. Originally inspired by the Republican
efforts to defund Planned Parenthood in 2015.

## Stack

This project was (re-)bootstrapped with [Create React App
v1.5.2][cra].

* React
* Sass as CSS extension language
* TypeScript (handled by `react-scripts`)
* Webpack as build system (managed by Create React App)
* Babel as compiler (managed by Create React App)
* Jest for unit testing and coverage (managed by Create React App)

[cra]: https://github.com/facebookincubator/create-react-app

## Developer Setup

### Prerequisites

* [Node LTS](https://nodejs.org/)
* [Watchman](https://facebook.github.io/watchman/)
* [Yarn](https://yarnpkg.com/en/)
* [AWS CLI](https://aws.amazon.com/cli/)
* [jq](https://stedolan.github.io/jq/)
* [Google API Key](https://console.developers.google.com/apis/dashboard) for
  the [Google Civic Information API][civics]
* [OpenSecrets API Key][opensecrets]

[civics]: https://console.developers.google.com/apis/library/civicinfo.googleapis.com?q=civic&id=a7de1ed0-c5d0-44ca-8365-267daf15ca5b
[opensecrets]: https://www.opensecrets.org/open-data/api-documentation

### Steps

The `build-env.sh` script needs an AWS profile called `whoismyvoice` set up
with credentials that give access to the Who Is My Voice AWS Account,
`690635890025`.

1. `git clone https://github.com/whoismyvoice/whoismyvoice.co.git`
1. `cd whoismyvoice.co`
1. `yarn install`
1. `npx vercel secrets add "react_app_mixpanel_token" "<mixpanel-token-here>"`
1. `npx vercel secrets add "open_secrets_api_key" "<opensecrets-api-key-here>"`
1. `npx vercel secrets add "google_civic_api_key" "<google-api-key-here>"`
1. Create `.env` file with `REACT_APP_MIXPANEL_TOKEN`, `GOOGLE_CIVIC_API_KEY`
   and `OPEN_SECRETS_API_KEY` values.
1. Copy `.env` to `.env.build`.

#### Build for development

This will start a development server and open a browser window pointing at the
localhost server.

    yarn run start

#### Run component tests

This will execute tests and start watching for changes. As useful as the
development server while making changes.

    yarn run test

Tests are executed by [GitHub Actions][actions] (see
[`nodejs.yml`](./.github/workflows/nodejs.yml)) on each pull request.

[actions]: https://github.com/marketplace/actions/setup-node-js-for-use-with-actions

#### Build for production

This should only be necessary if vercel encounters a problem executing the
build step.

    yarn run build

## Serverless Functions

The front end application uses [Vercel serverless functions][vercel-serverless]
to proxy requests to get around CORS and to hide API keys. The serverless
functions are defined by in the `api` directory.

[vercel-serverless]: https://vercel.com/docs/serverless-functions/introduction

## Environment Variables

These are managed by [Zeit Now secrets][vercel-secrets]. These are declared in the
`now.json` file to be injected into the environment.

[vercel-secrets]: https://vercel.com/docs/build-step#environment-variables

## Deployments

[Vercel][ci] handles building and deploying. The deployment process uses the
`build` script defined in `package.json`.

[ci]: https://vercel.com/whoismyvoice

## Development Guidelines

* `git fetch` and `git rebase` are preferred to `git pull`.
* Only `commit` changes you really want. Don't `git add .` unless you really
  mean to add everything.
* Use feature branches liberally
* When making a PR assign to another dev for code review. They'll merge into
  `master`.
* When creating a new page add required SASS stylesheets imports.
* Images should be included using `import` or `require`, see [Adding Images,
  Fonts, and Files][add-images]

[add-images]: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-images-fonts-and-files
