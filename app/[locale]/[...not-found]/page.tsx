import Link from 'next/link';
import { notFound } from 'next/navigation';
import initTranslations from '@/app/services/internationalization/i18n';
import styles from './page.module.css';

export default async function NotFoundPage({
  params,
}: {
  params: { locale?: string; slug?: string[] };
}) {
  if (!params || !params.locale) {
    notFound();
  }

  const { locale } = params;
  const { t } = await initTranslations(locale, ['not-found']);

  return (
    <div className={styles.notFound}>
      <h1>{t('not_found')}</h1>
      <p>{t('page_does_not_exist')}</p>
      <Link href="/" className="buttonLink">
        {t('go_back_home')}
      </Link>
    </div>
  );
}
