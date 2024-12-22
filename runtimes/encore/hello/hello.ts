import { api } from "encore.dev/api";

export const get = api(
  { expose: true, method: "GET", path: "/" },
  (): Response => {
    return { message: "Hello World!" };
  },
);

export const raw = api.raw(
  { expose: true, method: "GET", path: "/raw" },
  (req, resp): void => {
    resp.end("Hello world!");
  },
);

interface Response {
  message: string;
}
