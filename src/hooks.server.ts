import type { Handle } from "@sveltejs/kit";
import PocketBase from "pocketbase";
import { POCKETBASE_URL } from "$env/static/private";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.pb = new PocketBase(POCKETBASE_URL);

  event.locals.pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");

  try {
    if (event.locals.pb.authStore.isValid) {
      await event.locals.pb.collection("users").authRefresh();

      event.locals.user = structuredClone(event.locals.pb.authStore.model)!;
    }
  } catch (err) {
    // Clear the authStore if there is an error
    event.locals.pb.authStore.clear();
  }

  const response = await resolve(event);

  const isProd = process.env.NODE_ENV === "production";
  response.headers.set("set-cookie", event.locals.pb.authStore.exportToCookie({ secure: isProd, sameSite: "Lax" }));

  return response;
};
