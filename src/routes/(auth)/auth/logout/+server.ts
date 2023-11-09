import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals }) => {
  await locals.supabase.auth.signOut();
  locals.user = null;

  throw redirect(303, "/");
};
