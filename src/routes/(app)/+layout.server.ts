import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { handleLoginRedirect } from "$lib/utils/handle-login-redirect";

export const load = (async (event) => {
  const { user } = event.locals;

  if (!user) {
    throw redirect(303, handleLoginRedirect(event));
  }
}) satisfies LayoutServerLoad;
