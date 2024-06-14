import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import type { Construct } from "constructs";
import { file, id } from "../config";

export function backendApi(construct: Construct): apiGateway.LambdaRestApi {
    const fn = new NodejsFunction(construct, id.backend.api.function, {
        entry: file.backend.lambda.name,
        handler: file.backend.lambda.handler,
        runtime: lambda.Runtime.NODEJS_20_X,
    });
    fn.addFunctionUrl({
        authType: lambda.FunctionUrlAuthType.NONE,
    });
    return new apiGateway.LambdaRestApi(construct, id.backend.api.apiGateway, {
        handler: fn,
    });
}
