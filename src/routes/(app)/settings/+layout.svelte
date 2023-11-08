<script>
  import { page } from "$app/stores";

  // TODO move this into $lib/constants
  const navigation = [
    {
      title: "Profile",
      href: "/settings/profile"
    },
    {
      title: "Account",
      href: "/settings/account"
    },
    {
      title: "Security",
      href: "/settings/security"
    }
  ];
</script>

<div class="w-full h-full p-6">
  <h3 class="text-2xl font-medium">Settings</h3>
  <div class="divider" />
  <div class="flex w-full space-x-4">
    <div class="btn-group-vertical">
      {#each navigation as { href, title }}
        <a {href} class="font-medium" class:bg-primary-500={$page.url.pathname === href}>{title}</a>
      {/each}
    </div>
    <div class="w-full">
      <slot />
    </div>
  </div>
</div>
