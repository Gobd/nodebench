const text = "Hello World!";

// Hono Deno 3008
import { Hono } from "hono";
const app = new Hono();
app.get("/", (c) => {
  return c.text(text);
});
Deno.serve(
  {
    port: 3008,
  },
  app.fetch,
);

// Express Deno 3009
import express from "express";
const expressApp = new express();
expressApp.get("/", (req, res) => {
  res.send(text);
});
expressApp.listen(3009);
