/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/todo": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get todo list
         * @description Get todo list
         */
        get: operations["get_todo_list"];
        put?: never;
        /**
         * Add todo
         * @description Add todo
         */
        post: operations["add_todo"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** @description Response schema for getting todo list */
        GetTodoResponse: {
            /** @description Todo list */
            list: components["schemas"]["TodoWithId"][];
        };
        /** @description Request body schema for adding a new todo */
        PostTodoRequestBody: {
            todo: components["schemas"]["Todo"];
        };
        /** @description Response schema for adding a new todo */
        PostTodoResponse: {
            todo: components["schemas"]["WithId"];
        };
        /** @description Todo entity with an ID */
        TodoWithId: components["schemas"]["WithId"] & components["schemas"]["Todo"];
        /** @description Todo entity without an ID */
        Todo: {
            /**
             * @description Display name
             * @example Buy milk
             */
            name: string;
        };
        /** @description Schema that includes an ID */
        WithId: {
            /**
             * Format: uuid
             * @description Unique id
             * @example a6363b15-02e0-4124-9a99-6a1a872acc33
             */
            id: string;
        };
        /** @description Schema for error responses */
        ErrorResponse: {
            /**
             * @description Error message
             * @example Internal Server Error
             */
            message: string;
        };
    };
    responses: {
        /** @description Bad request */
        BadRequestErrorResponse: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
        /** @description Internal Server Error */
        InternalServerErrorResponse: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["ErrorResponse"];
            };
        };
    };
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    get_todo_list: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["GetTodoResponse"];
                };
            };
            500: components["responses"]["InternalServerErrorResponse"];
        };
    };
    add_todo: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PostTodoRequestBody"];
            };
        };
        responses: {
            /** @description Todo created successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["PostTodoResponse"];
                };
            };
            400: components["responses"]["BadRequestErrorResponse"];
            500: components["responses"]["InternalServerErrorResponse"];
        };
    };
}
