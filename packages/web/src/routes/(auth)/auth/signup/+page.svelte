<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';
  import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

  export let data: PageData;

  const { form, errors, constraints } = superForm(data.form);
</script>

<SuperDebug data={$form} />

<div class="container h-full mx-auto flex justify-center items-center">
  <div class="space-y-10 text-center flex flex-col items-center">
    <h1>Signup</h1>
    <form method="POST" use:enhance>
      <label class="label">
        <span>Name</span>
        <input
          type="text"
          name="name"
          class="input"
          class:input-error={$errors.name}
          bind:value={$form.name}
          aria-invalid={$errors.name ? 'true' : undefined}
          on:focus={() => ($errors.name = undefined)}
        />
      </label>
      {#if $errors.name}<span>{$errors.name[0]}</span>{/if}
      <label class="label">
        <span>E-mail</span>
        <input
          type="email"
          name="email"
          class="input"
          class:input-error={$errors.email}
          bind:value={$form.email}
          aria-invalid={$errors.email ? 'true' : undefined}
          on:focus={() => ($errors.email = undefined)}
        />
      </label>
      {#if $errors.email}<span>{$errors.email[0]}</span>{/if}
      <label class="label">
        <span>Password</span>
        <input
          type="password"
          name="password"
          id="password"
          class="input"
          class:input-error={$errors.password}
          bind:value={$form.password}
          aria-invalid={$errors.password ? 'true' : undefined}
          on:focus={() => ($errors.password = undefined)}
        />
      </label>
      {#if $errors.password}<span>{$errors.password[0]}</span>{/if}
      <label class="label">
        <span>Confirm password</span>
        <input
          type="password"
          name="password"
          id="password"
          class="input"
          class:input-error={$errors.passwordConfirm}
          bind:value={$form.passwordConfirm}
          aria-invalid={$errors.passwordConfirm ? 'true' : undefined}
          on:focus={() => ($errors.passwordConfirm = undefined)}
        />
      </label>
      {#if $errors.passwordConfirm}<span>{$errors.passwordConfirm[0]}</span>{/if}
      <button class="btn variant-filled-surface mt-2">Submit</button>
    </form>
  </div>
</div>
