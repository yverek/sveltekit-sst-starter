<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { page } from "$app/stores";
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
      background: $page.status === 200 ? "variant-filled-success" : "variant-filled-error"
    };
    toastStore.trigger(t);
  }
</script>

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
    </form>
  </div>
</div>
