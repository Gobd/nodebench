#!/bin/sh

docker build -t encorebase -f Dockerfile.base .
encore build docker --arch arm64 --base encorebase encorebench
