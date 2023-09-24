import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { loginFormSchema } from '$lib/zod-schemas';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const form = await superValidate(loginFormSchema);

  return { form };
}) satisfies PageServerLoad;

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, loginFormSchema);

    if (!form.valid) {
      // we must not return password to the client
      form.data.password = '';
      return fail(400, { form });
    }

    // TODO: Do something with the validated data

    return { form };
  }
};
