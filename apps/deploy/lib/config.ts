const project = "node-and-vite-react";

export const id = {
    backend: {
        api: {
            function: `${project}-backend-lambda`,
            apiGateway: `${project}-backend-apigateway`,
        },
    },
    frontend: {
        webpage: {
            s3Bucket: `${project}-frontend`,
            s3BucketDeploy: `${project}-frontend-deploy`,
            cloudfrontDistribution: `${project}-frontend-distribution`,
        },
    },
} as const;

export const file = {
    backend: {
        lambda: {
            name: "../backend/src/lambda.ts",
            handler: "handler",
        },
    },
    frontend: {
        buildDir: "../frontend/dist",
    },
};
