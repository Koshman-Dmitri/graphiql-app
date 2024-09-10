'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { COOKIE_NAME } from './config';

function logOutAction(locale: string, redirectPath = '') {
  cookies().delete(COOKIE_NAME);
  cookies().delete('firebaseUserName');
  redirect(`/${locale}/${redirectPath}`);
}

export default logOutAction;
