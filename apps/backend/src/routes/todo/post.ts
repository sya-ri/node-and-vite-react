import { zValidator } from "@hono/zod-validator";
import type { ApiBody, ApiResponse } from "@repo/openapi/backend.js";
import { z } from "zod";
import type { Route } from "../route.js";

const post: Route = (app) =>
    app.post(
        "/todo",
        zValidator(
            "json",
            z.object({
                todo: z.object({
                    name: z.string(),
                }),
            }),
        ),
        (c) => {
            const body = c.req.valid("json") satisfies ApiBody<"/todo", "post">;
            console.info(`Create todo: ${body.todo.name}`);
            return c.json<ApiResponse<"/todo", "post", 200>, 200>({
                todo: {
                    id: "bd6f38ed-f4a4-4c5a-98c4-757a3bb3f65e",
                },
            });
        },
    );

export default post;
