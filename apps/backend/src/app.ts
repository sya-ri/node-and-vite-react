import getTodo from "@/routes/todo/get.js";
import postTodo from "@/routes/todo/post.js";
import type { Route } from "@/utils/route.js";
import type { ComponentSchema } from "@repo/openapi/backend.js";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import type { StatusCode } from "hono/utils/http-status";

const app = new Hono();

const routes: Route[] = [getTodo, postTodo];

for (const route of routes) {
    route(app);
}

app.onError((err, c) => {
    if (err instanceof HTTPException) {
        return c.json<ComponentSchema<"ErrorResponse">, StatusCode>(
            {
                message: err.message,
            },
            err.status,
        );
    }
    console.error(err);
    return c.json<ComponentSchema<"ErrorResponse">, 500>({
        message: "Internal server error",
    });
});

export default app;
