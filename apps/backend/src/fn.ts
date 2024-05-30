import type {
    ApiMethod,
    ApiPath,
    ApiResponseBody,
    ApiResponseCode,
    ApiResponses,
} from "@repo/openapi/backend";

export const fn =
    <
        Path extends ApiPath,
        Method extends ApiMethod<Path>,
        Codes extends ApiResponseCode<Path, Method>[],
    >(
        handler: () => Promise<ApiResponses<Path, Method, Codes>>,
    ) =>
    async () => {
        const response = (await handler()) as ApiResponseBody<number, object>;
        return {
            statusCode: response.statusCode,
            body: JSON.stringify(response.body),
        };
    };
