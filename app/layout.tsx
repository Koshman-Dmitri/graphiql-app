import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import './globals.css';
import { getTokens } from 'next-firebase-auth-edge';
import { cookies, headers } from 'next/headers';
import { authConfig } from '@/config/config';
import toUser from './servises/user';
import { AuthProvider } from './auth/AuthProvider';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export const metadata: Metadata = {
  title: 'Graphiql App',
  description: 'Final React 2024Q3 Task',
};

export default async function RootLayout({ children }: Readonly<PropsWithChildren>) {
  const tokens = await getTokens(cookies(), {
    ...authConfig,
    headers: headers(),
  });
  const user = tokens ? toUser(tokens) : null;
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <div className="page">
          <AuthProvider user={user}>
            <Header user={user} />
            <main className="container">{children}</main>
            <Footer />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
