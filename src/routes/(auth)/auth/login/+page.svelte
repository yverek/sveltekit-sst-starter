<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import type { PageData } from "./$types";
  import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";

  const toastStore = getToastStore();

  export let data: PageData;

  const { form, errors, constraints, message, enhance } = superForm(data.form);

  $: if ($message) {
    const t: ToastSettings = {
      message: $message,
      timeout: 5000,
      hoverable: true,
      background: "variant-filled-error"
    };

    toastStore.trigger(t);
  }
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

      <a href="/auth/reset-password">Forgot password?</a>

      <button class="mt-5 btn variant-filled">Login</button>
    </form>
  </div>
</div>
