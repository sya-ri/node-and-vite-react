import type { paths } from "./backend-schema";

export type ApiPath = keyof paths;

export type ApiMethod<Path extends ApiPath> = keyof GetNestedValue<
    paths,
    [Path]
>;

export type ApiPathParam<
    Path extends ApiPath,
    Method extends ApiMethod<Path>,
> = GetNestedValue<paths, [Path, Method, "parameters", "path"]>;

export type ApiQueryParam<
    Path extends ApiPath,
    Method extends ApiMethod<Path>,
> = NonNullable<GetNestedValue<paths, [Path, Method, "parameters", "query"]>>;

export type ApiBody<
    Path extends ApiPath,
    Method extends ApiMethod<Path>,
> = GetNestedValue<
    paths,
    [Path, Method, "requestBody", "content", "application/json"]
>;

export type ApiResponseCode<
    Path extends ApiPath,
    Method extends ApiMethod<Path>,
> = keyof GetNestedValue<paths, [Path, Method, "responses"]> & number;

export type ApiResponse<
    Path extends ApiPath,
    Method extends ApiMethod<Path>,
    Code extends ApiResponseCode<Path, Method>,
> = ApiResponseBody<
    Code,
    GetNestedValue<
        paths,
        [Path, Method, "responses", Code, "content", "application/json"]
    > extends never
        ? Record<string, never>
        : GetNestedValue<
              paths,
              [Path, Method, "responses", Code, "content", "application/json"]
          >
>;

export type ApiResponseBody<Code extends number, Body> = {
    statusCode: Code;
    body: Body;
};

export type ApiResponses<
    Path extends ApiPath,
    Method extends ApiMethod<Path>,
    Codes extends ApiResponseCode<Path, Method>[],
> = XORResponses<{
    [K in keyof Codes]: Codes[K] extends ApiResponseCode<Path, Method>
        ? ApiResponse<Path, Method, Codes[K]>
        : never;
}>;

type GetNestedValue<
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    T extends Record<string, any>,
    Keys extends PropertyKey[],
> = 0 extends Keys["length"]
    ? T
    : Keys extends [infer First, ...infer Rest]
      ? First extends keyof T
          ? Rest extends PropertyKey[]
              ? GetNestedValue<T[First], Rest>
              : never
          : never
      : never;

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

type XOR<T, U> = T | U extends object
    ? (Without<T, U> & U) | (Without<U, T> & T)
    : T | U;

type XORResponses<TArray extends unknown[]> = TArray extends [
    infer First,
    infer Second,
    ...infer Rest,
]
    ? XOR<First, XORResponses<[Second, ...Rest]>>
    : TArray[0];
