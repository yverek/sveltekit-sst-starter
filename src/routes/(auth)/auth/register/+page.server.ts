import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { message, superValidate } from "sveltekit-superforms/server";
import { registerFormSchema } from "$lib/zod-schemas";

export const load = (async () => {
  const form = await superValidate(registerFormSchema);

  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, registerFormSchema);
    console.log("🚀 ~ file: +page.server.ts:15 ~ form:", form);

    if (!form.valid) {
      form.data.password = "";
      form.data.passwordConfirm = "";

      return message(form, "Invalid form");
    }

    // try {
    //   const { data } = form;
    //   await locals.pb.collection("users").create(data);
    //   await locals.pb.collection("users").requestVerification(data.email);
    // } catch (error) {
    //   if (error instanceof ClientResponseError) {
    //     const { code, message } = error.response;

    //     return message(form, message, { status: code });
    //   }

    //   return message(form, "Something went wrong", { status: 500 });
    // }

    // throw redirect(303, "/auth/login");
  }
} satisfies Actions;
