import { fn } from "../fn";

export const handler = fn<"/todo", "get", [200]>(async () => {
    // TODO: fake code
    return {
        statusCode: 200,
        body: {
            list: [
                {
                    id: "test",
                    name: "Test Name",
                },
            ],
        },
    };
});
