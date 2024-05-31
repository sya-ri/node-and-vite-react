import * as process from "node:process";
import { serve } from "@hono/node-server";
import app from "./app";

const port = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000;

serve({
    fetch: app.fetch,
    port,
});

console.log(`Server is running on port ${port}`);
