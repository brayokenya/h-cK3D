# ########

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.4.

## Development server
1. Run `npm install`
2. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Server Deployment
1. Project requires *node js* .
2. The project has two preset environments. To build the project for production use `ng build --prod`. Run use `ng build` for development/staging.
3. Serve the static files in `dist/mookh-admin` found in the root directory of the project using Nginx or IIS.

## Docker build

To build docker image run `docker build -t mookh-agent .`

## Docker run

Execute `docker run -d -p 80:80 --env API_HOST=yourApiUrl --env DEFAULT_LANGUAGE=de mookh-agent` to run docker image


# Development
## Code scaffolding / Contributing

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Development Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
