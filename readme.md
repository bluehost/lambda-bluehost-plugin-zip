# AWS Lambda - Bluehost Plugin Zip

![Deploy to Lambda](https://github.com/bluehost/lambda-bluehost-plugin-zip/workflows/Deploy%20to%20Lambda/badge.svg)

An AWS Lambda function designed to return a `.zip` file for registered Bluehost plugins.

## Usage

Visit `https://bluehost-wp-release.com/v1/:plugin` where `:plugin` is a registered plugin name.

## Registered Plugin Names

- [bluehost-wordpress-plugin](https://github.com/bluehost/bluehost-wordpress-plugin)
- [mojo-marketplace-wp-plugin](https://github.com/mojoness/mojo-marketplace-wp-plugin)

## Install

- Run `npm install`

## Deployment

By default, this repository is setup to auto-deploy when a new commit is made.

However, if you wish to push changes from your local machine while testing, you can simply run the `npm run deploy` command. 

In order for local deployments to actually work, you will need to:

- Install the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) tool.
- Create a [named profile](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) named `bluehost`. 
