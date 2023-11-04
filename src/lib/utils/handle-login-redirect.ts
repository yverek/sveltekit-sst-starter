import type { RequestEvent } from "@sveltejs/kit";

export function handleLoginRedirect(event: RequestEvent) {
  const { pathname, search } = event.url;
  const redirectTo = pathname + search;

  return `/auth/login?redirectTo=${redirectTo}`;
}
