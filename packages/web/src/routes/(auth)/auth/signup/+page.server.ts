import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { signupFormSchema } from '$lib/zod-schemas';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const form = await superValidate(signupFormSchema);

  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, signupFormSchema);
    console.log('🚀 ~ file: +page.server.ts:15 ~ form:', form);

    if (!form.valid) {
      // we must not return password to the client
      form.data.password = '';
      form.data.passwordConfirm = '';

      return fail(400, { form });
    }

    // TODO: Do something with the validated data

    return { form };
  }
};
