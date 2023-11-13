import type { PageServerLoad } from "./$types";

export const load = (async ({ locals: { getSession }, parent }) => {
  const data = await parent();
  const session = await getSession();

  const user = session?.user;
  const profile = data.profile;

  return { session, user, profile };
}) satisfies PageServerLoad;
