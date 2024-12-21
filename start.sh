#!/bin/sh

set -ex

rm -rf ./results/*

cd ./runtimes/encore || exit
./build.sh
cd .. || exit

docker compose up \
    --build \
    --remove-orphans \
    --force-recreate \
    --abort-on-container-exit

node chart.js
