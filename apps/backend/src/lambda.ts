import app from "@/app.js";
import { handle } from "hono/aws-lambda";

export const handler = handle(app);
