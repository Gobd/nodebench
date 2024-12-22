const text = "Hello World!";

// Hono Node 3004
import { serve } from "@hono/node-server";
import { Hono } from "hono";
const app = new Hono();
app.get("/", (c) => {
  return c.text(text);
});
serve({
  fetch: app.fetch,
  port: 3004,
});

// Express Node 3005
import express from "express";
const expressApp = new express();
expressApp.get("/", (req, res) => {
  res.send(text);
});
expressApp.listen(3005);

// Fastify Node 3006
import Fastify from "fastify";
const fastifyApp = new Fastify();
fastifyApp.get("/", function (request, reply) {
  reply.send(text);
});
fastifyApp.listen({
  port: 3006,
});
