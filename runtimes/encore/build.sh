#!/bin/sh

if ! [ -x "$(command -v encore)" ]; then
  echo 'Error: encore is not installed, see https://encore.dev/docs/ts/install to install' >&2
  exit 1
fi

ARCH=$(uname -m)
if [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then
  ARCH="arm64"
else
  ARCH="amd64"
fi

encore version update
docker build -t encorebase -f Dockerfile.base .
encore build docker --services=hello --arch "$ARCH" --base encorebase encorebench
