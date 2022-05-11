# dockerized-nestjs-api-bootsrap

## Description
A dockerized Nest.js API boostrap with:
* OpenAPI(swagger),
* Terminus endpoint (Healthchecks),
* Prometheus default metrics and custom metrics,
* Winston/ Morgan logger,
* OpenTracing (Jaeger) .

The API was built using [Nest](https://github.com/nestjs/nest) framework.

## Prerequisite

Node.js v14.x

1. [Docker Engine](https://docs.docker.com/engine/install/) or [Docker Desktop](https://docs.docker.com/desktop/)
1. [Docker Compose](https://docs.docker.com/compose/install/)
1.  Nest CLI 
    ```bash
    $ npm i -g @nest/cli
    ```
1.  TypeORM CLI (optional) 
    ```bash
    $ npm i -g typeorm ts-node
    ```

## Installation

```bash
# install dependencies
$ npm i

# prepare .env file
$ cp example.env .env
# edit .env file and change TYPEORM_PASSWORD value
```

## Running the app (node way)

```bash
# launch mysql DB
docker-compose up -d

# development
$ npm run start

# watch mode
$ npm run start:dev

# debug mode
$ npm run start:debug

# production mode
$ npm run start:prod
```

## Running the app (docker way)

```bash
# build the containers
# development
# watch mode
# debug mode
$ docker-compose --file docker-compose.ev.yml up --build

# production mode
# build image
$  docker build . --tag cbeurtheret/myhome-api:latest
# start app
$  docker-compose --file docker-compose.prod.yml up -d
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Dependencies

This project uses the following Nest / Node modules :
* [@digikare/nestjs-prom](https://www.npmjs.com/package/@digikare/nestjs-prom): A prometheus module for Nest.
* [prom-client](https://www.npmjs.com/package/prom-client): A prometheus client for Node.js that supports histogram, summaries, gauges and counters.
* [@dollarsign/nestjs-jaeger-tracing](https://www.npmjs.com/package/@dollarsign/nestjs-jaeger-tracing): Jaeger distributed tracing for Nest framework
* [nestjs-winston-logger](https://www.npmjs.com/package/nestjs-winston-logger): A Winston based logging module for Nest
* [winston](https://www.npmjs.com/package/winston): A logger for just about everything.
* [morgan](https://www.npmjs.com/package/morgan): HTTP request logger middleware for node.js
