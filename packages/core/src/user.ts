import { db } from "./db";
import { user } from "./db/schema";

export async function list() {
  const data = await db.select().from(user);

  return data;
}

export * as User from "./user";
