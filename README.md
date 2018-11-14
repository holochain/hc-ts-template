# Typescript + React + Redux + holochain-proto Template

Use this template to quickly get up and running with a Typescript build system with hot reloading.

![GitHub last commit](https://img.shields.io/github/last-commit/holochain/hc-ts-template.svg)
![GitHub](https://img.shields.io/github/license/holochain/hc-ts-template.svg)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Ensure holochain-proto (at least version 26) is installed on your machine by running. 

```
hcd -v
```

If you would like to install latest holochain-proto you can do it from [source](https://github.com/holochain/holochain-proto#go-based-install) or [download](https://github.com/holochain/holochain-proto/releases/) binaries.

You will also need to have npm/yarn installed to run compiling scripts and development server.

For Windows users we assume you're using [Git Bash](https://gitforwindows.org/).

### Installing

Install the javascript/typescript packages with

```
npm install
```
Build the Holochain dna using

```
npm run hc:build
```
and build the UI with
```
npm run build
```

The app can now be started for development purposes using
```
npm run hc:dev
```
and opening the browser to http://localhost:4141 

-----

If you would like to persist data between sessions install to the local holochain directory by running the following from the project root directory:
```
hcadmin init <id/name string>
hcadmin join ./build/ hc-ts-template
hcd hc-ts-template
```

## Running the tests

Run holochain test using

```
npm run hc:build && npm run hc:test
```

----

Run jest front-end tests using 
```
npm run test
```

## Built With

* [Holochain](https://github.com/holochain/holochain-proto)
* [Typescript](https://github.com/Microsoft/TypeScript)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)

## Authors

* **Willem Olding** - [willemolding](https://github.com/willemolding)
* **Michael Dougherty** - [maackle](https://github.com/maackle)

## License

This project is licensed under the GPL-3 License - see the [LICENSE.md](LICENSE.md) file for details

