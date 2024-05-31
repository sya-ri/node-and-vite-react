import { Hono } from "hono";
import type { Route } from "./routes/route.js";
import getTodo from "./routes/todo/get.js";
import postTodo from "./routes/todo/post.js";

const app = new Hono();

const routes: Route[] = [getTodo, postTodo];

for (const route of routes) {
    route(app);
}

export default app;
