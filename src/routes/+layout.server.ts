import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals: { getSession, supabase } }) => {
  let user, profile;
  const session = await getSession();

  if (session) {
    user = session.user;
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    profile = data;
  }

  return { session, user, profile };
}) satisfies LayoutServerLoad;
