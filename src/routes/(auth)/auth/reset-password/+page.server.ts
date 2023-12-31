import { message, superValidate } from "sveltekit-superforms/server";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { resetPasswordFormSchema } from "$lib/zod-schemas";

export const load = (async () => {
  const form = await superValidate(resetPasswordFormSchema);

  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, resetPasswordFormSchema);
    console.log("🚀 ~ file: +page.server.ts:15 ~ form:", form);

    if (!form.valid) {
      return message(form, "Invalid form");
    }

    // try {
    //   const { data } = form;

    //   await locals.pb.collection("users").requestPasswordReset(data.email);

    //   return message(form, "An email has been sent to reset your password!");
    // } catch (error) {
    //   if (error instanceof ClientResponseError) {
    //     const { code, message } = error.response;

    //     return message(form, message, { status: code });
    //   }

    //   return message(form, "Something went wrong", { status: 500 });
    // }
  }
} satisfies Actions;
