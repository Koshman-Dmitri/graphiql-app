'use client';

import { I18nextProvider } from 'react-i18next';
import initTranslations from '@/app/i18n';
import { createInstance, Resource } from 'i18next';
import { ReactNode } from 'react';

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources: Resource;
}) {
  const i18n = createInstance();

  // TODO
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
