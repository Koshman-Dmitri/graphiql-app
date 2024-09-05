import { cookies } from 'next/headers';
import MainPage from '../components/MainPage/MainPage';
import getAuthToken from '../services/firebase/getAuthToken';

export default function HomePage() {
  const hasToken = Boolean(getAuthToken());
  const userName = cookies().get('firebaseUserName')?.value || 'Anonymous';

  return <MainPage hasToken={hasToken} userName={userName} />;
}
