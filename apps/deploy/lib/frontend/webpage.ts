import { type RuntimeConfig, RuntimeConfigPath } from "@repo/runtime-config";
import { Duration, RemovalPolicy } from "aws-cdk-lib";
import type * as apiGateway from "aws-cdk-lib/aws-apigateway";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfrontOrigins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment";
import type { Construct } from "constructs";
import { file, id } from "../config";

export function webpage(
    construct: Construct,
    api: apiGateway.LambdaRestApi,
): cloudfront.Distribution {
    const bucket = new s3.Bucket(construct, id.frontend.webpage.s3Bucket, {
        removalPolicy: RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
    });
    new s3Deployment.BucketDeployment(
        construct,
        id.frontend.webpage.s3BucketDeploy,
        {
            sources: [
                s3Deployment.Source.asset(file.frontend.buildDir),
                s3Deployment.Source.jsonData(RuntimeConfigPath, {
                    apiUrl: api.url,
                } satisfies RuntimeConfig),
            ],
            destinationBucket: bucket,
        },
    );
    return new cloudfront.Distribution(
        construct,
        id.frontend.webpage.cloudfrontDistribution,
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
}
