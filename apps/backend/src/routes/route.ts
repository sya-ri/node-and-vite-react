import type { Hono } from "hono";

export type Route = (app: Hono) => void;
