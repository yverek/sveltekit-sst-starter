import { ClientResponseError } from "pocketbase";
import { message, superValidate } from "sveltekit-superforms/server";
import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { loginFormSchema } from "$lib/zod-schemas";

export const load = (async () => {
  const form = await superValidate(loginFormSchema);

  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, loginFormSchema);

    if (!form.valid) {
      // we must not return password to the client
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

    throw redirect(303, "/dashboard");
  }
} satisfies Actions;
