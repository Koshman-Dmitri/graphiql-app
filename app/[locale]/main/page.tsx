import Link from 'next/link';
import initTranslations from '@/app/services/internationalization/i18n';
import { RouteParams } from '@/app/utils/globalTypes';
import MainPageInfo from '@/app/components/MainPageInfo/MainPageInfo';
import styles from './page.module.css';

export default async function MainPage({ params }: RouteParams) {
  const isAuthenticated = false;
  const name = 'John Doe';

  const { t } = await initTranslations(params.locale, ['main', 'common']);

  if (!isAuthenticated) {
    return (
      <div className={styles.mainContent}>
        <h1 className="pageTitle">{t('title_primary_default')}</h1>
        <MainPageInfo params={params} />
        <div className={styles.authLinks}>
          <Link href="/sign-in" className={`buttonLink ${styles.authButton}`}>
            {t('common:sign_in')}
          </Link>
          <Link href="/sign-up" className={`buttonLink ${styles.authButton}`}>
            {t('common:sign_up')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContent}>
      <h1 className="pageTitle">{t('title_primary_auth', { name })}</h1>
      <MainPageInfo params={params} />
      <div className={styles.apiLinks}>
        <Link href="/rest" className={`buttonLink ${styles.apiButton}`}>
          {t('rest_btn')}
        </Link>
        <Link href="/graphql" className={`buttonLink ${styles.apiButton}`}>
          {t('graphiql_btn')}
        </Link>
        <Link href="/history" className={`buttonLink ${styles.apiButton}`}>
          {t('history_btn')}
        </Link>
      </div>
    </div>
  );
}
