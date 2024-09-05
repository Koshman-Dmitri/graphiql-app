import { JSX, PropsWithChildren, useEffect, useState } from 'react';
import { onIdTokenChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../../services/firebase/config';
import styles from './ProtectedRoute.module.css';

const ProtectedRoute = (
  Component: (props: PropsWithChildren) => JSX.Element,
  type: 'withAuth' | 'withoutAuth'
) => {
  function AuthenticatedComponent(props: PropsWithChildren) {
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

    return (
      <div className={styles.wrapper}>
        <h3 className={styles.title}>Checking authentification...</h3>
      </div>
    );
  }

  return AuthenticatedComponent;
};

export default ProtectedRoute;
