#!/bin/sh

cd ./runtimes/bun || exit
npx ncu -u
npm install
cd ../.. || exit

cd ./runtimes/deno || exit
npx ncu -u
npm install
cd ../.. || exit

cd ./runtimes/encore || exit
npx ncu -u
npm install
cd ../.. || exit

cd ./runtimes/node || exit
npx ncu -u
npm install
cd ../.. || exit

npx ncu -u
npm install
