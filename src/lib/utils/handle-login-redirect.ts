import type { RequestEvent } from "@sveltejs/kit";

export function handleLoginRedirect(event: RequestEvent, message: string = "You must be logged in to access this page") {
  const { pathname, search } = event.url;
  const redirectTo = pathname + search;

  return `/auth/login?redirectTo=${redirectTo}&message=${message}`;
}
