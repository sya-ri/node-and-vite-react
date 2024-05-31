import * as cdk from "aws-cdk-lib";
import * as gateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import type { Construct } from "constructs";

export class Stack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const fn = new NodejsFunction(
            this,
            "node-and-vite-react-backend-lambda",
            {
                entry: "../backend/src/lambda.ts",
                handler: "handler",
                runtime: lambda.Runtime.NODEJS_20_X,
            },
        );
        fn.addFunctionUrl({
            authType: lambda.FunctionUrlAuthType.NONE,
        });
        new gateway.LambdaRestApi(
            this,
            "node-and-vite-react-backend-api-gateway",
            {
                handler: fn,
            },
        );
    }
}
