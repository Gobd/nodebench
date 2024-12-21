#!/bin/sh

bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://bun:3000 > /results/hono-bun.txt
bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://bun:3001 > /results/express-bun.txt
bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://bun:3003 > /results/elysia-bun.txt

bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://node:3004 > /results/hono-node.txt
bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://node:3005 > /results/express-node.txt
bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://node:3006 > /results/fastify-node.txt

bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://deno:3008 > /results/hono-deno.txt
bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://deno:3009 > /results/express-deno.txt

bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://encore:8080 > /results/encore-json.txt
bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://encore:8080/raw > /results/encore-raw.txt
