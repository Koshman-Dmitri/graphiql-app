import initTranslations from '@/app/services/internationalization/i18n';
import { UrlParams } from '@/app/utils/globalTypes';
import getAuthToken from '@/app/services/firebase/getAuthToken';
import { redirect } from 'next/navigation';
import HistoryRequests from '../../components/HistoryRequests/HistoryRequests';

export default async function HistoryPage({ params }: UrlParams) {
  if (!getAuthToken()) redirect('/sign-in');

  const { t } = await initTranslations(params.locale, ['common', 'history']);

  return (
    <>
      <h1 className="pageTitle">{t('history:history_title')}</h1>
      <HistoryRequests />
    </>
  );
}
