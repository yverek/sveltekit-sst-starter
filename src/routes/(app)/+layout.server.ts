import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { handleLoginRedirect } from "$lib/utils/handle-login-redirect";

export const load = (async (event) => {
  const session = await event.locals.getSession();

  if (!session) {
    // the user is not signed in
    throw redirect(303, handleLoginRedirect(event));
  }

  return { session, user: session.user };
}) satisfies LayoutServerLoad;
