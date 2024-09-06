import { cookies } from 'next/headers';
import MainPage from '../components/MainPage/MainPage';
import getAuthToken from '../services/firebase/getAuthToken';
import initTranslations from '../services/internationalization/i18n';
import { RouteParams } from '../utils/globalTypes';

export default async function HomePage({ params }: RouteParams) {
  const { t } = await initTranslations(params?.locale, ['main']);
  const hasToken = Boolean(getAuthToken());
  const name = cookies().get('firebaseUserName')?.value || t('anonymous');

  return <MainPage hasToken={hasToken} name={name} />;
}
