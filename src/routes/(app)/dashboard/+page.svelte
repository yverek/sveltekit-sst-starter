<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

Dashboard
<pre class="pre mt-4">
  {JSON.stringify(data, null, 2)}
</pre>
