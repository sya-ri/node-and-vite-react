import * as cdk from "aws-cdk-lib";
import { Duration, RemovalPolicy } from "aws-cdk-lib";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfrontOrigins from "aws-cdk-lib/aws-cloudfront-origins";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment";
import type { Construct } from "constructs";

export class Stack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // backend --> lambda (nodejs)
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
        new apiGateway.LambdaRestApi(
            this,
            "node-and-vite-react-backend-api-apiGateway",
            {
                handler: fn,
            },
        );

        // frontend --> s3
        const bucket = new s3.Bucket(this, "node-and-vite-react-frontend", {
            removalPolicy: RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });
        new s3Deployment.BucketDeployment(
            this,
            "node-and-vite-react-frontend-deploy",
            {
                sources: [s3Deployment.Source.asset("../frontend/dist")],
                destinationBucket: bucket,
            },
        );
        const distribution = new cloudfront.Distribution(
            this,
            "node-and-vite-react-frontend-distribution",
            {
                defaultBehavior: {
                    origin: new cloudfrontOrigins.S3Origin(bucket),
                    viewerProtocolPolicy:
                        cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                },
                defaultRootObject: "index.html",
                errorResponses: [
                    {
                        httpStatus: 403,
                        responseHttpStatus: 200,
                        responsePagePath: "/index.html",
                        ttl: Duration.minutes(5),
                    },
                ],
            },
        );
        new cdk.CfnOutput(this, "Frontend URL", {
            value: `https://${distribution.domainName}`,
        });
    }
}
