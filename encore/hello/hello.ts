import { api } from "encore.dev/api";

export const get = api(
  { expose: true, method: "GET", path: "/" },
  async (): Promise<Response> => {
    return  { message: 'Hello World!' };
  }
);

export const raw = api.raw(
    { expose: true, method: "GET", path: "/raw" },
    async (req, resp) => {
        resp.end("Hello world!");
      },
  );

interface Response {
    message: string;
}
