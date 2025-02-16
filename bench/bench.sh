#!/bin/sh

curl --fail-with-body --silent --show-error "http://bun:${HONO_PORT}/gc" 
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://bun:${HONO_PORT}" > /results/hono-bun.json
curl --fail-with-body --silent --show-error "http://bun:${HONO_PORT}/gc" 
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://bun:${EXPRESS_PORT}" > /results/express-bun.json
curl --fail-with-body --silent --show-error "http://bun:${HONO_PORT}/gc" 
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://bun:${ELYSIA_PORT}" > /results/elysia-bun.json
curl --fail-with-body --silent --show-error "http://bun:${HONO_PORT}/gc" 
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://bun:${H3_PORT}" > /results/h3-bun.json
curl --fail-with-body --silent --show-error "http://bun:${HONO_PORT}/gc" 
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://bun:${HATTIP_PORT}" > /results/hattip-bun.json
curl --fail-with-body --silent --show-error "http://bun:${HONO_PORT}/gc" 
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://bun:${FASTIFY_PORT}" > /results/fastify-bun.json
curl --fail-with-body --silent --show-error "http://bun:${HONO_PORT}/gc" 
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://bun:${BUN_PORT}" > /results/bun-bun.json

curl --fail-with-body --silent --show-error "http://node:${HONO_PORT}/gc" 
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://node:${HONO_PORT}" > /results/hono-node.json
curl --fail-with-body --silent --show-error "http://node:${HONO_PORT}/gc" 
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://node:${EXPRESS_PORT}" > /results/express-node.json
curl --fail-with-body --silent --show-error "http://node:${HONO_PORT}/gc" 
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://node:${ELYSIA_PORT}" > /results/elysia-node.json
curl --fail-with-body --silent --show-error "http://node:${HONO_PORT}/gc" 
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://node:${FASTIFY_PORT}" > /results/fastify-node.json

curl --fail-with-body --silent --show-error "http://deno:${HONO_PORT}/gc" 
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://deno:${HONO_PORT}" > /results/hono-deno.json
curl --fail-with-body --silent --show-error "http://deno:${HONO_PORT}/gc" 
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://deno:${ELYSIA_PORT}" > /results/elysia-deno.json
curl --fail-with-body --silent --show-error "http://deno:${HONO_PORT}/gc" 
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://deno:${EXPRESS_PORT}" > /results/express-deno.json
curl --fail-with-body --silent --show-error "http://deno:${HONO_PORT}/gc" 
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://deno:${FASTIFY_PORT}" > /results/fastify-deno.json

bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://encore:${ENCORE_PORT}" > /results/encore-json.json
bombardier -c 200 -l -d 30s --fasthttp -p r -o j "http://encore:8080/raw" > /results/encore-raw.json
