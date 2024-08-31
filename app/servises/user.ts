import { Tokens } from 'next-firebase-auth-edge';
import { User } from '../auth/AuthContext';

const toUser = ({ token, customToken, decodedToken }: Tokens): User => {
  const {
    uid,
    email,
    picture: photoURL,
    email_verified: emailVerified,
    phone_number: phoneNumber,
    name: displayName,
    source_sign_in_provider: signInProvider,
  } = decodedToken as {
    uid: string;
    email?: string;
    picture?: string;
    email_verified?: boolean;
    phone_number?: string;
    name?: string;
    source_sign_in_provider?: string;
  };

  return {
    uid,
    email: email ?? null,
    displayName: displayName ?? null,
    photoURL: photoURL ?? null,
    phoneNumber: phoneNumber ?? null,
    emailVerified: emailVerified ?? false,
    providerId: signInProvider ?? '',
    idToken: token,
    customToken,
  };
};

export default toUser;
