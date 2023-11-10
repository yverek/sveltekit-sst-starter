import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals: { supabase } }) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    // TODO log this using a library
    console.log("🚀 ~ file: +server.ts:6 ~ error:", error);
  }

  throw redirect(303, "/");
};
