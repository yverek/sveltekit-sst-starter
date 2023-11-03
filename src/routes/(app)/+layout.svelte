<script lang="ts">
  import type { LayoutData } from "./$types";
  import { AppShell, AppBar } from "@skeletonlabs/skeleton";

  export let data: LayoutData;
</script>

<!-- TODO this should be changed into dashboard layout -->
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
        <div>Welcome {data.user.name}</div>
        <form action="/auth/logout" method="post">
          <button type="submit" class="btn btn-sm">Logout</button>
        </form>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>
  <!-- Page Route Content -->
  <slot />
</AppShell>
