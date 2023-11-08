import { ClientResponseError } from "pocketbase";
import { message, superValidate } from "sveltekit-superforms/server";
import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { loginFormSchema } from "$lib/zod-schemas";

export const load = (async ({ url }) => {
  const message = url.searchParams.get("redirectTo") && "You must be logged in to access this page";
  const form = await superValidate(loginFormSchema);

  form.message = message;

  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, locals, url }) => {
    const form = await superValidate(request, loginFormSchema);

    if (!form.valid) {
      form.data.password = "";

      return message(form, "Invalid form");
    }

    try {
      const user = await locals.pb.collection("users").authWithPassword(form.data.email, form.data.password);

      const { verified } = user.record;

      if (!verified) {
        locals.pb.authStore.clear();

        return message(form, "You must verify your email to login", { status: 401 });
      }
    } catch (error) {
      if (error instanceof ClientResponseError) {
        const { code, message } = error.response;

        return message(form, message, { status: code });
      }

      return message(form, "Something went wrong", { status: 500 });
    }

    let redirectTo = url.searchParams.get("redirectTo");

    if (redirectTo) {
      // with this line we are forcing to redirect to our domain
      // for example, if they pass a malicious domain like localhost:5173/auth/login?redirectTo=http://virus.com
      // the redirect to the malicious domain won't work because the will throw a 404
      // instead if it's a legit url like localhost:5173/auth/login?redirectTo=/admin it will work
      redirectTo = `/${redirectTo.slice(1)}`;
    }

    throw redirect(303, redirectTo ?? "/dashboard");
  }
} satisfies Actions;
