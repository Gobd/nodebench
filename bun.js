const text = 'Hello World!';

// Hono Bun 3000
import { Hono } from 'hono'
const honoApp = new Hono()
honoApp.get('/', (c) => {
  return c.text(text)
})
Bun.serve({
  port: 3000,
  fetch: honoApp.fetch,
})

// Express Bun 3001
import express from 'express'
const expressApp = new express()
expressApp.get("/", (req, res) => {
  res.send(text);
});
expressApp.listen(3001);

// Elysia Bun 3003
import { Elysia } from 'elysia'
const elysiaApp = new Elysia();
elysiaApp.get('/', text)
elysiaApp.listen(3003)
