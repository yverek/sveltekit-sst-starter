<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';
  import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

  export let data: PageData;

  const { form } = superForm(data.form);
</script>

<SuperDebug data={$form} />

<h1>Login</h1>

<!-- {#if form?.message}
  <p class="error">{form.message}</p>
{/if} -->

<div class="container h-full mx-auto flex justify-center items-center">
  <form method="POST" use:enhance>
    <label for="email">E-mail</label>
    <input type="email" name="email" bind:value={$form.email} />

    <label for="password">Password</label>
    <input type="password" name="password" id="password" />
    <div>
      <button>Submit</button>
    </div>
  </form>
  <a href="/password-reset">Reset password</a>
  <a href="/signup">Create an account</a>
</div>
