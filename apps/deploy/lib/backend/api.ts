import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import type { Construct } from "constructs";
import { id } from "../id";

export function backendApi(construct: Construct): apiGateway.LambdaRestApi {
    const fn = new NodejsFunction(construct, id.backend.api.function, {
        entry: "../backend/src/api.ts",
        handler: "handler",
        runtime: lambda.Runtime.NODEJS_20_X,
    });
    fn.addFunctionUrl({
        authType: lambda.FunctionUrlAuthType.NONE,
    });
    return new apiGateway.LambdaRestApi(construct, id.backend.api.apiGateway, {
        handler: fn,
    });
}
