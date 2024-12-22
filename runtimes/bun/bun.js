const text = "Hello World!";

// Hono Bun 3000
import { Hono } from "hono";
const honoApp = new Hono();
honoApp.get("/", (c) => {
  return c.text(text);
});
Bun.serve({
  port: 3000,
  fetch: honoApp.fetch,
});

// Express Bun 3001
import express from "express";
const expressApp = new express();
expressApp.get("/", (req, res) => {
  res.send(text);
});
expressApp.listen(3001);

// Elysia Bun 3003
import { Elysia } from "elysia";
const elysiaApp = new Elysia();
elysiaApp.get("/", text);
elysiaApp.listen(3003);

// H3 Bun 3020
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
  port: 3020,
  fetch: toWebHandler(h3App),
});

// Hattip Bun 3021
import bunAdapter from "@hattip/adapter-bun";
import { text as hattipText } from "@hattip/response";
import { createRouter as hattipCreateRouter } from "@hattip/router";
const hattipApp = hattipCreateRouter();
hattipApp.get("/", () => hattipText(text));
Bun.serve(bunAdapter(hattipApp.buildHandler(), { port: 3021 }));
