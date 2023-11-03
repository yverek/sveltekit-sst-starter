<script>
  import { page } from "$app/stores";
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

<div class="w-full h-full px-2">
  <h3 class="text-2xl font-medium">Settings</h3>
  <div class="divider" />
  <div class="flex w-full space-x-4">
    <ul class="menu bg-base-100 w-56 p-2 rounded-box">
      {#each navigation as { href, title }}
        <li>
          <a {href} class="font-medium" class:bg-primary-500={$page.url.pathname === href}>{title}</a>
        </li>
      {/each}
    </ul>
    <div class="w-full">
      <slot />
    </div>
  </div>
</div>
