import { createTodo } from "@/services/todoService.js";
import type { Route } from "@/utils/route.js";
import { validator } from "@/utils/validator.js";
import type { ApiBody, ApiResponse } from "@repo/openapi/backend.js";
import { z } from "zod";

const post: Route = (app) =>
    app.post(
        "/todo",
        validator(
            "json",
            z.object({
                todo: z.object({
                    name: z.string(),
                }),
            }),
        ),
        async (c) => {
            const body = c.req.valid("json") satisfies ApiBody<"/todo", "post">;
            console.info(`Create todo: ${JSON.stringify(body.todo)}`);
            const todo = await createTodo(body.todo);
            return c.json<ApiResponse<"/todo", "post", 200>, 200>({
                todo: {
                    id: todo.id,
                },
            });
        },
    );

export default post;
