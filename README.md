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

Subsequent steps also assumes npm/yarn is installed.

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
hcadmin join ./build/ minesweeper
hcd minesweeper
```

## Live edit Full-stack Dev environment

I got tired of managing the Holochain server when developing, since dealing with the port etc not getting released correctly is tedious. To make things smoother, give this a shot. 

You can start an easy "full stack" dev environment using
```
npm run dev:start
```
which will set up a front-end development server (using Webpack), as well as a Holochain dev server that'll automatically restart if you make any changes to a Zome typescript file or corresponding json. It uses pre-configured pm2 & nodemon instances that're called from this instance specifically, so as to not interfere with any global processes you might be using. To ensure a consistent environment, it also includes a prebuilt set of holochain binaries found in the ./hc-bin folder for running the wrapped Holochain agent & server. To access the persistent options mentioned above & not need to have your Holochain binaries on the global PATH, just use

```
./hc-bin/hcadmin init <id/name string>
./hc-bin/hcadmin join ./build/ minesweeper
./hc-bin/hcd minesweeper
```
instead.

Webpack is NOT set to automatically reload when a Zome is edited, personal preference as normally when doing that I'll be wanting to change a component as well first. So just F5 your browser if you change a zome in your dna-src folder.

## Full commands list for dev server

Convenience npm commands to manage running a pm2-wrapped Holochain instance

```
npm run hc:start-web
```
Build the dna-src folder & start serving a Holochain instance on port 4141

```
npm run dev:watch
```
Start nodemon watching & building any changes.

```
npm run hc:process
```
List all pm2 processes for this instance (should normally just be 1)

```
npm run hc:log 
```
Display the server log for the Holochain Dev Server

```
npm run hc:stop
```
Stop the dev server process.

```
npm run hc:remove-process
```
Stop the Holochain Web Server process & delete it from pm2 entirely

```
npm run hc:restart-web
```
Do a manual rebuild and safe pm2 restart

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
* **Viadata** - [viadata](https://github.com/viadata)

## License

This project is licensed under the GPL-3 License - see the [LICENSE.md](LICENSE.md) file for details

## Changelog

```
Version 0.2.0
```
- Added pm2, nodemon & grunt to dependencies
- Configured pm2 & nodemon to allow automated rebuild of dna for rapid development.
- Added prebuilt Holochain binaries to hc-bin
- Refactored sampleZome.ts to use typed functions (with arrow syntax) as basic example for new Typescript devs.

## TODO:
Grunt scripts to generate function stubs from zome json.
Drizzle-style React components to work with Holochain zomes
Assemblyscript integration ahead of Holochain
Zome library - best contributed Community made zomes, with tests and examples.
Nice pm2 log output to show warnings in UI for quick debugging
More examples - maybe even a Clutter reimplementation