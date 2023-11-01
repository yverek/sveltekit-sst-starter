<script lang="ts">
  import "../app.postcss";
  import type { LayoutData } from "./$types";
  import { AppShell, AppBar } from "@skeletonlabs/skeleton";

  // Floating UI for Popups
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
  import { storePopup } from "@skeletonlabs/skeleton";
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  export let data: LayoutData;
</script>

<!-- App Shell -->
<AppShell>
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar>
      <svelte:fragment slot="lead">
        <strong class="text-xl uppercase">Skeleton</strong>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        {#if !data.user}
          <a class="btn btn-sm" href="/auth/login">Login</a>
          <a class="btn btn-sm" href="/auth/register">Signup</a>
        {:else}
          <div>Welcome {data.user}</div>
        {/if}
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <!-- Page Route Content -->
  <slot />
</AppShell>
