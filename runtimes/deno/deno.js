const text = "Hello World!";

// Hono Deno
import { Hono } from "hono";
const app = new Hono();
app.get("/", (c) => {
  return c.text(text);
});
Deno.serve(
  {
    port: process.env.HONO_PORT,
  },
  app.fetch,
);

// Express Deno
import express from "express";
const expressApp = new express();
expressApp.get("/", (req, res) => {
  res.send(text);
});
expressApp.listen(process.env.EXPRESS_PORT);
