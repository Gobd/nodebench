#!/bin/sh

bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://bun:3000 > /results/hono-bun.json
bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://bun:3001 > /results/express-bun.json
bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://bun:3003 > /results/elysia-bun.json
bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://bun:3020 > /results/h3-bun.json
bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://bun:3021 > /results/hattip-bun.json

bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://node:3004 > /results/hono-node.json
bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://node:3005 > /results/express-node.json
bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://node:3006 > /results/fastify-node.json

bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://deno:3008 > /results/hono-deno.json
bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://deno:3009 > /results/express-deno.json

bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://encore:8080 > /results/encore-json.json
# bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://encore:8080/raw > /results/encore-raw.json
