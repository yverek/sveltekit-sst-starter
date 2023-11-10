<script lang="ts">
  import "../app.postcss";
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import { Toast } from "@skeletonlabs/skeleton";

  // Floating UI for Popups
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
  import { storePopup, initializeStores } from "@skeletonlabs/skeleton";
  import type { LayoutData } from "./$types";

  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  initializeStores();

  export let data: LayoutData;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  onMount(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => subscription.unsubscribe();
  });
</script>

<Toast position="t" />

<slot />
