import type { SSTConfig } from "sst";
import { SvelteKitSite, Config } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "sveltekit-sst-starter",
      region: "eu-central-1"
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const SUPABASE_URL = new Config.Secret(stack, "SUPABASE_URL");
      const SUPABASE_ANON_KEY = new Config.Secret(stack, "SUPABASE_ANON_KEY");

      const site = new SvelteKitSite(stack, "site", {
        bind: [SUPABASE_URL, SUPABASE_ANON_KEY]
      });

      stack.addOutputs({
        url: site.url
      });
    });
  }
} satisfies SSTConfig;
