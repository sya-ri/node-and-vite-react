import { fn } from "../fn";

export const handler = fn<"/todo", "post", [200]>(async () => {
    // TODO: fake code
    return {
        statusCode: 200,
        body: {
            todo: {
                id: "bd6f38ed-f4a4-4c5a-98c4-757a3bb3f65e",
            },
        },
    };
});
