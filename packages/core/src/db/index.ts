import { drizzle } from "drizzle-orm/aws-data-api/pg";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { RDS } from "sst/node/rds";
import { rdsClient } from "./client";

// TODO is this the correct way to retrieve information about RDS?
export const db = drizzle(rdsClient, {
  database: RDS.database.defaultDatabaseName,
  secretArn: RDS.database.secretArn,
  resourceArn: RDS.database.clusterArn,
  logger: true, // TODO this should configured dynamically using an environment variable
});

// TODO should we move this function into a dedicated lambda or using SST Script Construct?
await migrate(db, { migrationsFolder: "packages/core/migrations" });
