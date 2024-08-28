import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TranslationsProvider from '../components/TranslationsProvider/TranslationsProvider';
import initTranslations from '../services/internationalization/i18n';

export const metadata: Metadata = {
  title: 'Graphiql App',
  description: 'Final React 2024Q3 Task',
};

interface LayoutProps extends PropsWithChildren {
  params: { locale: string };
}

const namespaces = ['main', 'common', 'rest'];

export default async function RootLayout({ children, params: { locale } }: LayoutProps) {
  const { resources } = await initTranslations(locale, namespaces);

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
          <div className="page">
            <Header />
            <main className="container">{children}</main>
            <Footer />
          </div>
        </TranslationsProvider>
      </body>
    </html>
  );
}
