<a href="http://codeclimate.com/github/ca-cwds/CALS"><img src="http://codeclimate.com/github/ca-cwds/CALS/badges/gpa.svg" /></a>
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8cf2373d85364e24976380e4e5a10cce)](https://www.codacy.com/app/CALS/CALS?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ca-cwds/CALS&amp;utm_campaign=Badge_Grade)
[![Build Status](http://jenkins.cs-cals.com:8080/buildStatus/icon?job=CALS-Dev-Build)](http://jenkins.cs-cals.com:8080/job/CALS-Dev-Build/)

# README
A React front end with a Rails backend serving up assets through webpacker for the state of california CWDS project.

## System
Ruby version: `2.4.2`

Rails version: `5.1.x`

## Configuration
Make sure homebrew is up to date and xcode is installed.
`Brew update`

Make sure XCode is installed.
`xcode-select --install`

## initialization

run the command:
`yarn run dev-build`

from the root folder. This will perform the following actions:
 - `bundle install`
 - `yarn install packages`
 - `compiles webpack assets`
 - `starts assets`
 - `starts rails server`

The App is running on
`localhost:5000`.

to view the facilities demo webapp, go to
`localhost:5000/facilities` .

assets compiled via webpack live on:
`localhost:5080`

## REDIS
NOTE: it is also important to also have redis server running. Start server with
`redis-server`

if redis is not installed, enter the following command from terminal:
`brew install redis `

this command will install all necessary redis files.


## Testing

to run linting on the project:

`yarn run lint`

### run all tests instructions
to run all tests and output code coverage:

`yarn run all-tests`

### Karma tests instructions
To run the karma tests, from the root folder run:
`npm run karma` (with reports), `npm run karma-ci` (without reports)

this command will run the automated tests and open a browser with the results.

### Rspec tests instructions
 rspec tests live in the root spec/ folder. you can run all tests with either of the following commands

 `yarn run spec`
 `rspec spec`


## Deployment
see docker wiki

FIXME
FIXME
FIME
DEBUG

FIXME
FIXME

FIXME
FIXME

DEBUG


DEBUG

FIXME
FIME
DEBUG

FIXME
FIXME

FIXME
FIXME

DEBUG


DEBUG
FIXME
FIME
DEBUG

FIXME
FIXME

FIXME
FIXME

DEBUG


DEBUG
FIXME
FIME
DEBUG

FIXME
FIXME

FIXME
FIXME

DEBUG


DEBUG
FIXME
FIME
DEBUG

FIXME
FIXME

FIXME
FIXME

DEBUG


DEBUG
FIXME
FIME
DEBUG

FIXME
FIXME

FIXME
FIXME

DEBUG


DEBUG

DEBUG


DEBUG

CUSTOM
