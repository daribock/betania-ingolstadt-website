import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer';
import { AuthJsBackendAuthProvider, TinaAuthJSOptions } from 'tinacms-authjs';

import databaseClient from '../../../tina/__generated__/databaseClient';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

const secret = process.env.NEXTAUTH_SECRET;

if (!secret) {
  throw new Error('NEXTAUTH_SECRET is not defined');
}

const handler = TinaNodeBackend({
  authProvider: isLocal
    ? LocalBackendAuthProvider()
    : AuthJsBackendAuthProvider({
        authOptions: TinaAuthJSOptions({
          databaseClient: databaseClient,
          secret,
        }),
      }),
  databaseClient,
});

// eslint-disable-next-line import/no-anonymous-default-export, @typescript-eslint/no-explicit-any
export default (req: any, res: any) => {
  // Modify the request here if you need to
  return handler(req, res);
};
