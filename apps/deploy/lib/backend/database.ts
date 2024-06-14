import { CustomResource, Duration } from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as rds from "aws-cdk-lib/aws-rds";
import {
    AuroraPostgresEngineVersion,
    DatabaseClusterEngine,
} from "aws-cdk-lib/aws-rds";
import * as customResources from "aws-cdk-lib/custom-resources";
import type { Construct } from "constructs";
import * as fs from "fs-extra";
import { file, id } from "../config";

export function database(construct: Construct) {
    const vpc = new ec2.Vpc(construct, id.backend.database.vpc, {
        natGateways: 0,
    });

    const writer = rds.ClusterInstance.provisioned(id.backend.database.writer);
    const database = new rds.DatabaseCluster(
        construct,
        id.backend.database.cluster,
        {
            engine: DatabaseClusterEngine.auroraPostgres({
                version: AuroraPostgresEngineVersion.VER_16_1,
            }),
            vpc,
            writer,
            vpcSubnets: {
                subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
            },
        },
    );
    if (!database.secret) {
        throw new Error("Database secret not set.");
    }

    fs.copySync(file.backend.prisma, file.backend.migrateDockerPrisma, {
        overwrite: true,
    });
    const migrateFunction = new lambda.DockerImageFunction(
        construct,
        id.backend.database.migrate.docker,
        {
            vpc,
            timeout: Duration.minutes(5),
            code: lambda.DockerImageCode.fromImageAsset(
                file.backend.migrateDocker,
            ),
            environment: {
                DB_CONNECTION: database.secret.secretValue.unsafeUnwrap(),
            },
        },
    );
    database.connections.allowDefaultPortFrom(migrateFunction);

    const resourceProvider = new customResources.Provider(
        construct,
        id.backend.database.migrate.resourceProvider,
        {
            onEventHandler: migrateFunction,
        },
    );
    const lastMigrationId = fs
        .readdirSync(file.backend.prismaMigrations)
        .filter((name) => name !== "migration_lock.toml")
        .sort()
        .reverse()[0];
    new CustomResource(construct, id.backend.database.migrate.resource, {
        serviceToken: resourceProvider.serviceToken,
        properties: {
            lastMigrationId,
        },
    });
}
