import { drizzle } from "drizzle-orm/aws-data-api/pg";
import { client } from "./client";

export const db = drizzle(client, {
  database: process.env.RDS_ARN!,
  secretArn: process.env.RDS_SECRET!,
  resourceArn: process.env.RDS_DATABASE!,
  logger: true, // TODO this should configured dynamically using an environment variable
});
