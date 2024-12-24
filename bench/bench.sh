#!/bin/sh

bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://bun:${HONO_PORT}" > /results/hono-bun.json
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://bun:${EXPRESS_PORT}" > /results/express-bun.json
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://bun:${ELYSIA_PORT}" > /results/elysia-bun.json
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://bun:${H3_PORT}" > /results/h3-bun.json
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://bun:${HATTIP_PORT}" > /results/hattip-bun.json

bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://node:${HONO_PORT}" > /results/hono-node.json
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://node:${EXPRESS_PORT}" > /results/express-node.json
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://node:${ELYSIA_PORT}" > /results/elysia-node.json
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://node:${FASTIFY_PORT}" > /results/fastify-node.json

bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://deno:${HONO_PORT}" > /results/hono-deno.json
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://deno:${ELYSIA_PORT}" > /results/elysia-deno.json
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://deno:${EXPRESS_PORT}" > /results/express-deno.json

bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://encore:${ENCORE_PORT}" > /results/encore-json.json
# bombardier -c 200 -l -d 30s --fasthttp -p r -o j http://encore:8080/raw > /results/encore-raw.json
