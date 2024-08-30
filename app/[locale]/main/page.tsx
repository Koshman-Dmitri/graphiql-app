import Link from 'next/link';
import initTranslations from '@/app/services/internationalization/i18n';
import { UrlParams } from '@/app/utils/globalTypes';
import styles from './page.module.css';

export default async function MainPage({ params }: UrlParams) {
  const isAuthenticated = true;

  const { t } = await initTranslations(params.locale, ['main', 'common']);

  const generalInfo = (
    <>
      <h3>{t('title_secondary')}</h3>
      <p>{t('description')}</p>
    </>
  );

  if (!isAuthenticated) {
    return (
      <div className={styles.mainContent}>
        <h2>{t('title_primary')}</h2>
        {generalInfo}
        <div className={styles.mainLinks}>
          <Link href="/sign-in" className={`buttonLink ${styles.buttonLinkMain}`}>
            {t('common:sign_in')}
          </Link>
          <Link href="/sign-up" className={`buttonLink ${styles.buttonLinkMain}`}>
            {t('common:sign_up')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContent}>
      <h2>{t('title_primary')}</h2>
      {generalInfo}
      <div className={styles.mainLinks}>
        <Link href="/rest" className={`buttonLink ${styles.buttonLinkMain}`}>
          {t('rest_client')}
        </Link>
        <Link href="/graphql" className={`buttonLink ${styles.buttonLinkMain}`}>
          {t('graphiql_client')}
        </Link>
        <Link href="/history" className={`buttonLink ${styles.buttonLinkMain}`}>
          {t('history')}
        </Link>
      </div>
    </div>
  );
}
