import * as cdk from "aws-cdk-lib";
import type { Construct } from "constructs";
import { backendApi } from "./backend/api";
import { database } from "./backend/database";
import { webpage } from "./frontend/webpage";

export class Stack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // backend --> lambda (nodejs)
        const api = backendApi(this);
        database(this);

        // frontend --> s3
        const distribution = webpage(this, api);

        // Print to console: frontend url
        new cdk.CfnOutput(this, "Frontend URL", {
            value: `https://${distribution.domainName}`,
        });
    }
}
