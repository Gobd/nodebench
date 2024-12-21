#!/bin/sh

if ! [ -x "$(command -v encore)" ]; then
  echo 'Error: encore is not installed, see https://encore.dev/docs/ts/install to install' >&2
  exit 1
fi

encore version update
docker build -t encorebase -f Dockerfile.base .
encore build docker --arch arm64 --base encorebase encorebench
