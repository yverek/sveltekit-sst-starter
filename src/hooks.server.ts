import { createServerClient } from "@supabase/ssr";
import type { Handle } from "@sveltejs/kit";
import { Config } from "sst/node/config";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(Config.SUPABASE_URL, Config.SUPABASE_ANON_KEY, {
    cookies: {
      get: (key) => event.cookies.get(key),
      set: (key, value, options) => {
        event.cookies.set(key, value, options);
      },
      remove: (key, options) => {
        event.cookies.delete(key, options);
      }
    }
  });

  /**
   * a little helper that is written for convenience so that instead
   * of calling `const { data: { session } } = await supabase.auth.getSession()`
   * you just call this `await getSession()`
   */
  event.locals.getSession = async () => {
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();

    return session;
  };

  return resolve(event);
};
