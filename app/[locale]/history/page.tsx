import initTranslations from '@/app/services/internationalization/i18n';
import HistoryRequests from '../../components/HistoryRequests/HistoryRequests';

export default async function HistoryPage({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await initTranslations(locale, ['common', 'history']);

  return (
    <>
      <h1 className="pageTitle">{t('history:history_title')}</h1>
      <HistoryRequests />
    </>
  );
}
