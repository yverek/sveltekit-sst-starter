<script lang="ts">
  import { AppShell, AppBar, AppRail, AppRailAnchor, Avatar } from "@skeletonlabs/skeleton";
  import { LogOut, PieChart, Search, Settings, Wallet } from "lucide-svelte";
  import type { LayoutData } from "./$types";
  import { page } from "$app/stores";

  export let data: LayoutData;
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <a href="/">
          <img src="/favicon.png" class="ml-2 h-8" alt="Skeleton Logo" />
        </a>
      </svelte:fragment>
      <svelte:fragment slot="trail">
        <div>Welcome {data.session?.user.email}</div>
        <!-- <Avatar src={data.user.avatar} width="w-10" rounded="rounded-full" initials="MD" /> -->
        <form action="/auth/logout" method="post">
          <button type="submit" class="btn-icon w-10 hover:variant-filled-primary">
            <span><LogOut /></span>
          </button>
        </form>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <svelte:fragment slot="sidebarLeft">
    <AppRail>
      <svelte:fragment slot="lead">
        <AppRailAnchor href="/dashboard" selected={$page.url.pathname === "/dashboard"}>
          <svelte:fragment slot="lead"><PieChart class="mx-auto" /></svelte:fragment>
          <span>Dashboard</span>
        </AppRailAnchor>
      </svelte:fragment>

      <AppRailAnchor href="/search" selected={$page.url.pathname === "/search"}>
        <svelte:fragment slot="lead"><Search class="mx-auto" /></svelte:fragment>
        <span>Search</span>
      </AppRailAnchor>
      <AppRailAnchor href="/wallet" selected={$page.url.pathname === "/wallet"}>
        <svelte:fragment slot="lead"><Wallet class="mx-auto" /></svelte:fragment>
        <span>Wallet</span>
      </AppRailAnchor>

      <svelte:fragment slot="trail">
        <AppRailAnchor href="/settings/profile" selected={$page.url.pathname.startsWith("/settings")}>
          <svelte:fragment slot="lead"><Settings class="mx-auto" /></svelte:fragment>
          <span>Settings</span>
        </AppRailAnchor>
      </svelte:fragment>
    </AppRail>
  </svelte:fragment>

  <slot />
</AppShell>
