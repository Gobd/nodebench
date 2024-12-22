#!/bin/sh

set -ex

rm -rf ./results/*

cd ./runtimes/encore || exit
rm -rf .encore
rm -rf encore.gen
./build.sh
cd ../.. || exit

npm install

rm -rf ./runtimes/bun/node_modules
rm -rf ./runtimes/deno/node_modules
rm -rf ./runtimes/encore/node_modules
rm -rf ./runtimes/node/node_modules

docker compose \
    -f ./bench/docker-compose.yaml \
    up \
    --build \
    --remove-orphans \
    --force-recreate \
    --abort-on-container-exit

node ./bench/chart.js
