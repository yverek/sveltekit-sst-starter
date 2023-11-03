import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals, url }) => {
  if (!locals.user) {
    const { pathname, search } = url;
    const fromUrl = pathname + search;

    throw redirect(303, `/auth/login?redirectTo=${fromUrl}`);
  }

  return { user: locals.user };
}) satisfies LayoutServerLoad;
