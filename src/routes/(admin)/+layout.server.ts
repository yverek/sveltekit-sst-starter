import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { handleLoginRedirect } from "$lib/utils/handle-login-redirect";

// TODO add a "role" field and a control in this load function to check is user is actually an admin
export const load = (async (event) => {
  if (!event.locals.pb.authStore.isValid) {
    throw redirect(303, handleLoginRedirect(event));
  }
}) satisfies LayoutServerLoad;
