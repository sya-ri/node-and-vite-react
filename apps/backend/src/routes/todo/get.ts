import type { ApiResponse } from "@repo/openapi/backend.js";
import type { Route } from "../route.js";

const get: Route = (app) =>
    app.get("/todo", (c) =>
        c.json<ApiResponse<"/todo", "get", 200>, 200>({
            list: [
                {
                    id: "4333f432-9232-491b-99b0-804f93dc8952",
                    name: "Test Name",
                },
            ],
        }),
    );

export default get;
