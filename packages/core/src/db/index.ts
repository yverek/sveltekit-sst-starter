import { drizzle } from "drizzle-orm/aws-data-api/pg";
import { RDSDataClient } from "@aws-sdk/client-rds-data";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { fromIni } from "@aws-sdk/credential-providers";
import { RDS } from "sst/node/rds";

const rdsClient = new RDSDataClient({
  credentials: fromIni({ profile: process.env.AWS_PROFILE }),
  region: "eu-central-1",
});

// TODO is this the correct way to retrieve information about RDS?
export const db = drizzle(rdsClient, {
  database: RDS.database.defaultDatabaseName,
  secretArn: RDS.database.secretArn,
  resourceArn: RDS.database.clusterArn,
  logger: true,
});

// TODO should we move this function into a dedicated lambda or using SST Script Construct?
await migrate(db, { migrationsFolder: "packages/core/migrations" });
