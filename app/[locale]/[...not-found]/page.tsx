import Link from 'next/link';
import initTranslations from '@/app/services/internationalization/i18n';
import { RouteParams } from '@/app/utils/globalTypes';
import styles from './page.module.css';

export default async function NotFoundPage({ params }: RouteParams) {
  const { t } = await initTranslations(params.locale, ['not-found']);

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
