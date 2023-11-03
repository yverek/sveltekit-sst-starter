<script lang="ts">
  import "../app.postcss";
  import type { LayoutData } from "./$types";
  import { AppShell, AppBar, Toast } from "@skeletonlabs/skeleton";

  // Floating UI for Popups
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
  import { storePopup, initializeStores } from "@skeletonlabs/skeleton";

  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  initializeStores();

  export let data: LayoutData;
</script>

<Toast position="t" />

<!-- App Shell -->
<AppShell>
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar>
      <svelte:fragment slot="lead">
        <a href="/" class="href">
          <strong class="text-xl uppercase">Skeleton</strong>
        </a>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        {#if !data.user}
          <a class="btn btn-sm" href="/auth/login">Login</a>
          <a class="btn btn-sm" href="/auth/register">Signup</a>
        {:else}
          <div>Welcome {data.user.name}</div>
          <form action="/auth/logout" method="post">
            <button type="submit" class="btn btn-sm">Logout</button>
          </form>
        {/if}
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <!-- Page Route Content -->
  <slot />
</AppShell>
