const project = "node-and-vite-react";

export const id = {
    backend: {
        api: {
            function: `${project}-backend-lambda`,
            apiGateway: `${project}-backend-apigateway`,
        },
        database: {
            vpc: `${project}-backend-database-vpc`,
            writer: `${project}-backend-database-writer`,
            cluster: `${project}-backend-database-cluster`,
            migrate: {
                docker: `${project}-backend-migrate-docker`,
                resourceProvider: `${project}-backend-migrate-resource-provider`,
                resource: `${project}-backend-migrate-resource`,
            },
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
        migrateDocker: "./docker/prisma-migrate",
        migrateDockerPrisma: "./docker/prisma-migrate/prisma",
        prisma: "../../packages/database/prisma",
        prismaMigrations: "../../packages/database/prisma/migrations",
    },
    frontend: {
        buildDir: "../frontend/dist",
    },
};
