import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { handleLoginRedirect } from "$lib/utils/handle-login-redirect";

// TODO add a "role" field and a control in this load function to check is user is actually an admin
export const load = (async (event) => {
  const data = await event.parent();
  const session = await event.locals.getSession();

  if (!session) {
    // the user is not signed in
    throw redirect(303, handleLoginRedirect(event));
  }

  const { user } = session;
  const { profile } = data;

  return { session, user, profile };
}) satisfies LayoutServerLoad;
