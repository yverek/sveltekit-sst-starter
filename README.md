# SvelteKit SST Starter

Bootstrap your next SaaS project with this SvelteKit + PocketBase + SST template. :rocket:

## Roadmap

### Release 1.0

- [x] Generate [Skeleton](https://www.skeleton.dev) project
- [x] Add [SST](https://sst.dev)
- [x] Add [PocketBase](https://pocketbase.io)
- [x] Add [Lucide](https://lucide.dev/)
- [x] Add [Zod](https://github.com/colinhacks/zod)
- [x] Add [SuperForms](https://github.com/ciscoheat/sveltekit-superforms)
- [ ] Add User Management
  - [x] Login
  - [ ] Logout
  - [x] Register
  - [ ] Reset password
  - [ ] Email verification
  - [ ] Simple user dashboard
- [ ] Add [inlang](https://github.com/inlang/inlang)
- [ ] Add logging system following [this](https://sst.dev/chapters/setup-error-logging-in-serverless.html)
- [ ] Add Admin Dashboard using [Salvia Kit](https://github.com/salvia-kit/salvia-kit)
- [ ] Add [Stripe](https://stripe.com/it)
- [ ] Add Cookie Consent component
- [ ] Add Google Analytics
- [ ] Add [Storybook](https://storybook.js.org)
- [ ] Add [Husky](https://github.com/typicode/husky)
- [ ] Add `Feature Request` and `Bug Report` templates
- [ ] Add GitHub Actions to automatic deploy when push on master

## Developing

Once you've cloned or forked this repo and installed dependencies with `pnpm install` (or `npm install` or `yarn`), start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
