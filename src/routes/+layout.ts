import { createBrowserClient, isBrowser, parse, combineChunks } from "@supabase/ssr";
import type { LayoutLoad } from "./$types";
import type { Database, Profile } from "../database.types";
import type { User } from "@supabase/supabase-js";
import { Config } from "sst/node/config";

export const load = (async ({ fetch, data, depends }) => {
  depends("supabase:auth");

  const supabase = createBrowserClient<Database>(Config.SUPABASE_URL, Config.SUPABASE_ANON_KEY, {
    global: {
      fetch
    },
    cookies: {
      get(key) {
        if (!isBrowser()) {
          return JSON.stringify(data.session);
        }

        const cookie = combineChunks(key, (name) => {
          const cookies = parse(document.cookie);
          return cookies[name];
        });
        return cookie;
      }
    }
  });

  let user: User | undefined = undefined;
  let profile: Profile | null = null;

  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (session) {
    ({ user } = session);
    profile = (await supabase.from("profiles").select("*").eq("id", user.id).single()).data;
  }

  return { supabase, session, user, profile };
}) satisfies LayoutLoad;
