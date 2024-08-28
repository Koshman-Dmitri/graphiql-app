import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware, redirectToHome, redirectToLogin } from 'next-firebase-auth-edge';
import { clientConfig, serverConfig } from './app/servises/firebase/config';

const PUBLIC_PATHS = ['/sign-up', '/sign-in'];

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  return authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: {
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'lax' as const,
      maxAge: 60 * 60,
    },
    serviceAccount: serverConfig.serviceAccount,

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
  ],
};
