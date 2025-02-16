const text = "Hello World!";

// Hono Bun
import { Hono } from "hono";
const honoApp = new Hono();
honoApp.get("/", (c) => {
  return c.text(text);
});
honoApp.get("/gc", (c) => {
  Bun.gc(true);
  return c.text(text);
});
Bun.serve({
  port: process.env.HONO_PORT,
  fetch: honoApp.fetch,
});

// Express Bun
import express from "express";
const expressApp = new express();
expressApp.get("/", (req, res) => {
  res.send(text);
});
expressApp.listen(process.env.EXPRESS_PORT);

// Elysia Bun
import { Elysia } from "elysia";
const elysiaApp = new Elysia();
elysiaApp.get("/", text);
elysiaApp.listen(process.env.ELYSIA_PORT);

// H3 Bun
import {
  createApp,
  createRouter as h3CreateRouter,
  defineEventHandler,
  toWebHandler,
} from "h3";
const h3Router = h3CreateRouter();
const h3App = createApp();
h3App.use(h3Router);
h3Router.get(
  "/",
  defineEventHandler(() => {
    return text;
  }),
);
Bun.serve({
  port: process.env.H3_PORT,
  fetch: toWebHandler(h3App),
});

// Hattip Bun
import bunAdapter from "@hattip/adapter-bun";
import { text as hattipText } from "@hattip/response";
import { createRouter as hattipCreateRouter } from "@hattip/router";
const hattipApp = hattipCreateRouter();
hattipApp.get("/", () => hattipText(text));
Bun.serve(
  bunAdapter(hattipApp.buildHandler(), { port: process.env.HATTIP_PORT }),
);

// Fastify Bun
import Fastify from "fastify";
const fastifyApp = new Fastify();
fastifyApp.get("/", function (request, reply) {
  reply.send(text);
});
fastifyApp.listen({
  port: process.env.FASTIFY_PORT,
  host: "0.0.0.0",
});

// Bun Bun
Bun.serve({
  port: process.env.BUN_PORT,
  routes: {
    "/": {
      GET: async () => new Response(text, { status: 200 }),
    },
  },
  fetch: () => new Response("Not Found", { status: 404 }),
});
