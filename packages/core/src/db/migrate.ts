import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./db";

// TODO should we move this function into a dedicated lambda or using SST Script Construct?
await migrate(db, { migrationsFolder: "packages/core/migrations" });
