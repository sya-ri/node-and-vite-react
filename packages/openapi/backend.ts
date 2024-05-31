import type { components, paths } from "./backend-schema";

export type ComponentSchemaName = keyof components["schemas"];

export type ComponentSchema<Name extends ComponentSchemaName> =
    components["schemas"][Name];

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
> = GetNestedValue<
    paths,
    [Path, Method, "responses", Code, "content", "application/json"]
> extends never
    ? Record<string, never>
    : GetNestedValue<
          paths,
          [Path, Method, "responses", Code, "content", "application/json"]
      >;

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
