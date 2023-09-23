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
    console.log('POST', form);

    if (!form.valid) {
      return fail(400, { form });
    }

    // TODO: Do something with the validated data

    return { form };
  }
};
