import { execSync } from "node:child_process";
import type {
    CdkCustomResourceHandler,
    CdkCustomResourceResponse,
} from "aws-lambda";

export const handler: CdkCustomResourceHandler = async (event) => {
    console.log(JSON.stringify(event));
    const physicalResourceId = event.ResourceProperties.physicalResourceId;
    if (event.RequestType === "Delete") {
        return {
            PhysicalResourceId: physicalResourceId,
        };
    }
    if (!process.env.DB_CONNECTION) {
        throw new Error("DB_CONNECTION is not set.");
    }
    const db = JSON.parse(process.env.DB_CONNECTION);
    return new Promise<CdkCustomResourceResponse>((resolve) => {
        setInterval(() => {
            try {
                const stdout = execSync("prisma migrate deploy", {
                    env: {
                        ...process.env,
                        DATABASE_URL: `${db.engine}://${db.username}:${db.password}@${db.host}:${db.port}/${db.dbname}`,
                    },
                });
                console.log(stdout.toString());
                resolve({
                    PhysicalResourceId: physicalResourceId,
                });
            } catch (error) {
                console.error(
                    "Migration is failed %s, will be retry...",
                    error,
                );
            }
        }, 10 * 1000);
    });
};
