import { zValidator } from "@hono/zod-validator";
import type { ComponentSchema } from "@repo/openapi/backend.js";

export const validator = (
    target: Parameters<typeof zValidator>[0],
    schema: Parameters<typeof zValidator>[1],
) =>
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
