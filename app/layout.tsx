import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import './globals.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export const metadata: Metadata = {
  title: 'Graphiql App',
  description: 'Final React 2024Q3 Task',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body>
        <Header />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
