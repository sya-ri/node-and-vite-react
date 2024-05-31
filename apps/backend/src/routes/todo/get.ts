import { getTodos } from "@/services/todoService.js";
import type { Route } from "@/utils/route.js";
import type { ApiResponse } from "@repo/openapi/backend.js";

const get: Route = (app) =>
    app.get("/todo", (c) =>
        getTodos().then((todos) =>
            c.json<ApiResponse<"/todo", "get", 200>, 200>({
                list: todos,
            }),
        ),
    );

export default get;
