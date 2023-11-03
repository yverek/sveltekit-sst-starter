<script lang="ts">
  import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";
  import { AlertTriangle, XCircle } from "lucide-svelte";
  import { superForm } from "sveltekit-superforms/client";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  export let data: PageData;

  const { form, errors, constraints, message, enhance } = superForm(data.form);
</script>

<SuperDebug data={$form} />

<!-- TODO this should be exported to a layout.svelte file -->
<!-- TODO add the constratints to password fields after changed related zod schema -->
<div class="container h-full mx-auto flex justify-center items-center">
  <div class="space-y-10 text-center flex flex-col items-center">
    <div>
      <h3 class="h3">Reset your password</h3>
      <p>We'll send you an email with a link to reset your password.</p>
    </div>
    <form method="post" use:enhance>
      <label class="label">
        <span>Email</span>
        <input
          class="input"
          type="text"
          name="email"
          placeholder="Email"
          aria-invalid={$errors.email ? "true" : undefined}
          bind:value={$form.email}
          {...$constraints.email}
        />
      </label>

      <button class="mt-5 btn variant-filled">Request password reset</button>

      {#if $message}
        <aside class="alert mt-4" class:variant-filled-success={$page.status === 200} class:variant-filled-error={$page.status >= 400}>
          <div><AlertTriangle /></div>
          <div class="alert-message">
            <h3 class="h3">Success!</h3>
            <p>{$message}</p>
          </div>
          <div class="alert-actions">
            <button on:click={() => ($page.form.success = false)}><XCircle /></button>
          </div>
        </aside>
      {/if}
    </form>
  </div>
</div>
