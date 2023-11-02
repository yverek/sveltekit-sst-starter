import { ClientResponseError } from "pocketbase";
import { superValidate } from "sveltekit-superforms/server";
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

      return fail(400, { form });
    }

    try {
      const user = await locals.pb.collection("users").authWithPassword(form.data.email, form.data.password);

      const { verified } = user.record;

      if (!verified) {
        locals.pb.authStore.clear();
        return fail(401, { message: "You must verify your email to login" });
      }
    } catch (error) {
      if (error instanceof ClientResponseError) {
        const { code, message, data } = error.response;

        return fail(code, { message, data });
      }

      return fail(500, { message: "Something went wrong" });
    }

    throw redirect(303, "/auth/login");
  }
} satisfies Actions;
