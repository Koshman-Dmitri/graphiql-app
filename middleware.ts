import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware, redirectToHome, redirectToLogin } from 'next-firebase-auth-edge';
import { authConfig } from './config/config';

const PUBLIC_PATHS = ['/sign-up', '/sign-in'];

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  return authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    refreshTokenPath: '/api/refresh-token',
    enableMultipleCookies: authConfig.enableMultipleCookies,
    apiKey: authConfig.apiKey,
    cookieName: authConfig.cookieName,
    cookieSignatureKeys: authConfig.cookieSignatureKeys,
    cookieSerializeOptions: authConfig.cookieSerializeOptions,
    serviceAccount: authConfig.serviceAccount,

    handleValidToken: ({ decodedToken }, headers) => {
      if (PUBLIC_PATHS.includes(currentPath)) {
        console.log('Valid token detected:', decodedToken.email);
        return Promise.resolve(redirectToHome(request));
      }
      return Promise.resolve(
        NextResponse.next({
          request: {
            headers,
          },
        })
      );
    },
    handleInvalidToken: (reason) => {
      console.info('Missing or malformed credentials', { reason });
      return Promise.resolve(
        redirectToLogin(request, {
          path: '/sign-in',
          publicPaths: PUBLIC_PATHS,
        })
      );
    },
    handleError: (error) => {
      console.error('Unhandled authentication error', { error });

      return Promise.resolve(
        redirectToLogin(request, {
          path: '/sign-in',
          publicPaths: PUBLIC_PATHS,
        })
      );
    },
  });
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/rest/:path',
    '/history',
    '/graphiql',
    '/api/login',
    '/api/logout',
    '/api/refresh-token',
  ],
};
