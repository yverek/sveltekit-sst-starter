import type { Record } from "pocketbase";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
  namespace App {
    type PocketBase = import("pocketbase").default;

    interface Locals {
      pb: PocketBase;
      user: Record | null;
    }
    // interface PageData {}
    // interface Error {}
    // interface Platform {}
  }
}

export {};
