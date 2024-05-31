#!/usr/bin/env node

import "source-map-support/register";
import { Stack } from "@lib/stack";
import * as cdk from "aws-cdk-lib";

const app = new cdk.App();

new Stack(app, "node-and-vite-react", {
    env: {
        region: "ap-northeast-1",
    },
});
