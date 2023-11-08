<script lang="ts">
  import type { LayoutData } from "./$types";
  import { AppShell, AppBar } from "@skeletonlabs/skeleton";
  import { Facebook, Twitter, Instagram } from "lucide-svelte";

  export let data: LayoutData;
</script>

<AppShell regionPage="hide-scrollbar">
  <svelte:fragment slot="header">
    <AppBar regionRowMain="container mx-auto" gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
      <svelte:fragment slot="lead">
        <a href="/" class="flex items-center mb-4 sm:mb-0">
          <img src="favicon.png" class="h-8 mr-3" alt="Skeleton Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Skeleton</span>
        </a>
      </svelte:fragment>

      <nav>
        <ul class="flex gap-8">
          <li><a href="/#features">Features</a></li>
          <li><a href="/#pricing">Pricing</a></li>
          <li><a href="/#testimonials">Testimonials</a></li>
        </ul>
      </nav>

      <svelte:fragment slot="trail">
        {#if !data.user}
          <a class="btn btn-sm" href="/auth/login">Login</a>
          <a class="btn variant-filled-primary" href="/auth/register">Signup</a>
        {:else}
          <a class="btn variant-filled-primary" href="/dashboard">Open App</a>
        {/if}
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <slot />

  <svelte:fragment slot="pageFooter">
    <footer class="container mx-auto px-4">
      <div class="w-full py-4 lg:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a href="/" class="flex items-center mb-4 sm:mb-0">
            <img src="favicon.png" class="h-8 mr-3" alt="Skeleton Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Skeleton</span>
          </a>

          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/legal/privacy-policy" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
              <a href="/legal/cookie-policy" class="mr-4 hover:underline md:mr-6">Cookie Policy</a>
            </li>
            <li>
              <a href="/legal/license" class="hover:underline">Licensing</a>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div class="sm:flex sm:items-center sm:justify-between">
          <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023 <a href="/" class="hover:underline">Skeleton™</a>. All Rights Reserved.
          </span>
          <div class="sm:flex sm:items-center sm:justify-between">
            <div class="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
              <a href="facebook.com" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <Facebook />
                <span class="sr-only">Facebook page</span>
              </a>
              <a href="twitter.com" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <Twitter />
                <span class="sr-only">Twitter page</span>
              </a>
              <a href="instagram.com" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                <Instagram />
                <span class="sr-only">Instagram account</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </svelte:fragment>
</AppShell>
