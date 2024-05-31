#!/usr/bin/env node

import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { BackendStack } from "../lib/backend-stack";

const app = new cdk.App();

new BackendStack(app, "node-and-vite-react-backend", {
    env: {
        region: "ap-northeast-1",
    },
});
