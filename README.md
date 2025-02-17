## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript app.
- Logger
- Postgres, TypeORM
- Redis Cache
- Books, Authors - REST API
- Pagination
- JWT Auth
- Graystash, winston logging

## Project setup

```bash
$ yarn install
```

## Start Docker DB, Redis, Adminer, Graylog

```bash
$ docker-compose up

cd ./graylog-docker-compose && docker-compose up

```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Stay in touch

- Author - [Yurii Vydai](mailto:yuriivydai@gmail.com)
- Website - [https://yuriivydai34.github.io](https://yuriivydai34.github.io)
