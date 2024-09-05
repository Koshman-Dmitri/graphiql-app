import { JSX, useEffect, useState } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../../services/firebase/config';

const ProtectedRoute = (Component: () => JSX.Element, type: 'withAuth' | 'withoutAuth') => {
  function AuthenticatedComponent(props: JSX.IntrinsicAttributes) {
    const [isAuth, setIsAuth] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onIdTokenChanged(auth, (user) => {
        if (user && type === 'withAuth') {
          setIsAuth(true);
        } else if (!user && type === 'withoutAuth') {
          setIsAuth(true);
        } else {
          router.replace('/');
        }
      });

      return unsubscribe;
    }, [router]);

    if (isAuth) return <Component {...props} />;

    return null;
  }

  return AuthenticatedComponent;
};

export default ProtectedRoute;
