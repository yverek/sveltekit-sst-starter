import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { postgres as postgresAdapter } from '@lucia-auth/adapter-postgresql';
import { dev } from '$app/environment';
import { rdsClient } from '@sveltekit-sst-starter/core/src/db';

export const auth = lucia({
  env: dev ? 'DEV' : 'PROD',
  middleware: sveltekit(),
  adapter: postgresAdapter(rdsClient, {
    user: 'auth_user',
    key: 'user_key',
    session: 'user_session'
  })
});

export type Auth = typeof auth;
