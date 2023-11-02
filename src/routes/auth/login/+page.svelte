<script lang="ts">
  import { AlertTriangle, XCircle } from "lucide-svelte";
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms/client";
  import { page } from "$app/stores";

  export let data: PageData;

  const { form, errors, constraints } = superForm(data.form);
</script>

<!-- TODO this should be exported to a layout.svelte file -->
<!-- TODO add the constratints to password fields after changed related zod schema -->
<div class="container h-full mx-auto flex justify-center items-center">
  <div class="space-y-10 text-center flex flex-col items-center">
    <div>
      <h3 class="h3">Register for an account</h3>
      <p>Or <a href="/auth/register" class="text-primary-500">sign in</a> if you already have an account.</p>
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

      <label class="label">
        <span>Password</span>
        <input
          class="input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          aria-invalid={$errors.password ? "true" : undefined}
          bind:value={$form.password}
        />
      </label>

      <button class="mt-5 btn variant-filled">Login</button>

      {#if $page.status === 400 || $page.status === 401}
        <aside class="alert variant-filled-error mt-4">
          <div><AlertTriangle /></div>
          <div class="alert-message">
            <h3 class="h3">Error!</h3>
            <p>{$page.form.message}</p>
          </div>
          <div class="alert-actions"><XCircle /></div>
        </aside>
      {/if}
    </form>
  </div>
</div>
