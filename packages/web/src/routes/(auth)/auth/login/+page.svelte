<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';
  import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

  export let data: PageData;

  const { form, errors, constraints } = superForm(data.form);
</script>

<div class="container h-full mx-auto flex justify-center items-center">
  <div class="space-y-10 text-center flex flex-col items-center">
    <h1>Login</h1>
    <form method="POST" use:enhance>
      <label class="label">
        <span>E-mail</span>
        <input
          type="email"
          name="email"
          class="input"
          bind:value={$form.email}
          aria-invalid={$errors.email ? 'true' : undefined}
          {...$constraints.email}
        />
      </label>
      {#if $errors.email}<span>{$errors.email}</span>{/if}
      <label class="label">
        <span>Password</span>
        <input
          type="password"
          name="password"
          id="password"
          class="input"
          bind:value={$form.password}
          aria-invalid={$errors.password ? 'true' : undefined}
          {...$constraints.password}
        />
      </label>
      {#if $errors.password}<span>{$errors.password}</span>{/if}
      <button class="btn variant-filled-surface mt-2">Submit</button>
    </form>
    <div>
      <a href="/password-reset">Reset password</a>
      <a href="/signup">Create an account</a>
    </div>
  </div>
</div>
