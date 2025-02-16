const text = "Hello World!";

global.gc();

// Hono Node
import { serve } from "@hono/node-server";
import { Hono } from "hono";
const app = new Hono();
app.get("/", (c) => {
  return c.text(text);
});
serve({
  fetch: app.fetch,
  port: process.env.HONO_PORT,
});

global.gc();

// Express Node
import express from "express";
const expressApp = new express();
expressApp.get("/", (req, res) => {
  res.send(text);
});
expressApp.listen(process.env.EXPRESS_PORT);

global.gc();

// Elysia Node
import { Elysia } from "elysia";
import { node } from "@elysiajs/node";
const elysiaApp = new Elysia({ adapter: node() });
elysiaApp.get("/", text);
elysiaApp.listen(process.env.ELYSIA_PORT);

global.gc();

// Fastify Node
import Fastify from "fastify";
const fastifyApp = new Fastify();
fastifyApp.get("/", function (request, reply) {
  reply.send(text);
});
fastifyApp.listen({
  port: process.env.FASTIFY_PORT,
});
