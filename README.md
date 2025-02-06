## Nestjs starter

Nestjs template 2025 using these
- clean architecture
- mongodb
- mongoose
- jest unit test
- decorators
- exception handling
- filter
- jwt guard
- validator
- i18n
- middlewares
- swagger
- dockerfile

let see Nuxt-starter repo for frontend

## sample database deployment
extract sample-mongodb.zip import folder localhost using studio 3T by mondodump folder

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

## Test

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

```bash
### Docker Build
docker build -t nestjs-starter .

### Docker Run
docker run -it -p 3000:3000 nestjs-starter

## Deploy
gcloud run deploy nestjs-starter --project kasamsun --region=asia-southeast1 --port 8080 --max-instances=1 --allow-unauthenticated --source=.
```