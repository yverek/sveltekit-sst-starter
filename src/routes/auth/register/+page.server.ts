import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms/server";
import { registerFormSchema } from "$lib/zod-schemas";

export const load = (async () => {
  const form = await superValidate(registerFormSchema);

  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, registerFormSchema);
    console.log("POST", form);

    if (!form.valid) {
      // we must not return password to the client
      form.data.password = "";
      form.data.passwordConfirm = "";

      return fail(400, { form });
    }

    try {
      // TODO check this
      await locals.pb.collection("users").create(form.data);
      await locals.pb.collection("users").requestVerification(form.data.email);
    } catch (error) {
      console.log("Error: ", error);
      // throw error(500, "Something went wrong");
    }

    throw redirect(303, "/auth/login");
  }
} satisfies Actions;
