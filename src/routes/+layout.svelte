<script lang="ts">
  import "../app.postcss";
  import { Toast } from "@skeletonlabs/skeleton";

  // Floating UI for Popups
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
  import { storePopup, initializeStores } from "@skeletonlabs/skeleton";

  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  initializeStores();
</script>

<Toast position="t" />

<slot />
