import { zValidator } from "@hono/zod-validator";
import type { ComponentSchema } from "@repo/openapi/backend.js";
import type { Env, Input, MiddlewareHandler, ValidationTargets } from "hono";
import type { z } from "zod";

type HasUndefined<T> = undefined extends T ? true : false;

export const validator = <
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    T extends z.ZodType<any, z.ZodTypeDef, any>,
    Target extends keyof ValidationTargets,
    E extends Env,
    P extends string,
    In = z.input<T>,
    Out = z.output<T>,
    I extends Input = {
        in: HasUndefined<In> extends true
            ? {
                  [K in Target]?:
                      | (K extends "json"
                            ? In
                            : HasUndefined<
                                    keyof ValidationTargets[K]
                                > extends true
                              ? {
                                    [K2 in keyof In]?:
                                        | ValidationTargets[K][K2]
                                        | undefined;
                                }
                              : {
                                    [K2_1 in keyof In]: ValidationTargets[K][K2_1];
                                })
                      | undefined;
              }
            : {
                  [K_1 in Target]: K_1 extends "json"
                      ? In
                      : HasUndefined<keyof ValidationTargets[K_1]> extends true
                        ? {
                              [K2_2 in keyof In]?:
                                  | ValidationTargets[K_1][K2_2]
                                  | undefined;
                          }
                        : { [K2_3 in keyof In]: ValidationTargets[K_1][K2_3] };
              };
        out: { [K_2 in Target]: Out };
    },
    V extends I = I,
>(
    target: Target,
    schema: T,
): MiddlewareHandler<E, P, V> =>
    // @ts-ignore
    zValidator(target, schema, (result, c) => {
        if (!result.success) {
            return c.json<ComponentSchema<"ErrorResponse">, 400>({
                message: `Invalid input: ${JSON.stringify(
                    result.error.errors,
                )}`,
            });
        }
    });
