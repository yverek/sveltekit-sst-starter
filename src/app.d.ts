import { SupabaseClient, Session, type User } from "@supabase/supabase-js";
import { Database, type Profile } from "./database.types";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>;
      getSession(): Promise<Session | null>;
    }
    interface PageData {
      session: Session | null;
      user: User | undefined;
      profile: Profile | null;
    }
    // interface Error {}
    // interface Platform {}
  }
}

export {};
