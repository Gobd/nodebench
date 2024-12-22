# nodebench

Benchmark some Node compatible runtimes and routers and output graphs and JSON data.

## Running

Requires [Docker](https://docs.docker.com/engine/install/), [Encore](https://encore.dev/docs/ts/install), and [Node](https://nodejs.org/en/download/package-manager) to be installed locally. Only tested on Mac, probably works on Linux too, don't think it'll work on Windows.

Run `npm run lint` and `npm run format` before committing, the Husky pre-commit hook should handle this.

To update all deps run `./checkdeps.sh`

To run the benchmarks and generate graphs run `./start.sh` this will output everything into a top-level results folder.

To stop all of the Docker containers started run `./down.sh`
