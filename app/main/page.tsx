'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function MainPage() {
  const router = useRouter();
  const isAuthenticated = true;
  // const isAuthenticated = false;

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.main}>
      {!isAuthenticated ? (
        <div className={styles['main-content']}>
          <h1>Welcome!</h1>
          <nav className={styles['main-links']}>
            <button onClick={() => handleRedirect('/sign-in')} type="button">
              Sign In
            </button>
            <button onClick={() => handleRedirect('/sign-up')} type="button">
              Sign Up
            </button>
          </nav>
        </div>
      ) : (
        <div className={styles['main-content']}>
          <h1>Welcome Back, [Username]!</h1>
          <nav className={styles['main-links']}>
            <button onClick={() => handleRedirect('/rest-client')} type="button">
              REST Client
            </button>
            <button onClick={() => handleRedirect('/graphiql-client')} type="button">
              GraphiQL Client
            </button>
            <button onClick={() => handleRedirect('/history')} type="button">
              History
            </button>
          </nav>
          <h2>General information about the developers, project, and course:</h2>
          <p>
            The standard Lorem Ipsum passage, used since the 1500s Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Section 1.10.32
            of de Finibus Bonorum et Malorum, written by Cicero in 45 BC Sed ut perspiciatis unde
            omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. No one rejects, dislikes, or avoids pleasure itself, because it is
            pleasure, but because those who do not know how to pursue pleasure rationally encounter
            consequences that are extremely painful. Nor again is there anyone who loves or pursues
            or desires to obtain pain of itself, because it is pain, but because occasionally
            circumstances occur in which toil and pain can procure him some great pleasure.
          </p>
          <p>
            NTemporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
            eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum
            rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
            consequatur aut perferendis doloribus asperiores repellat. 1914 translation by H.
            Rackham On the other hand, we denounce with righteous indignation and dislike men who
            are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by
            desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal
            blame belongs to those who fail in their duty through weakness of will, which is the
            same as saying through shrinking from toil and pain. These cases are perfectly simple
            and easy to distinguish.
          </p>
          <p>
            NTemporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
            eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum
            rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias
            consequatur aut perferendis doloribus asperiores repellat. 1914 translation by H.
            Rackham On the other hand, we denounce with righteous indignation and dislike men who
            are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by
            desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal
            blame belongs to those who fail in their duty through weakness of will, which is the
            same as saying through shrinking from toil and pain. These cases are perfectly simple
            and easy to distinguish. In a free hour, when our power of choice is untrammelled and
            when nothing prevents our being able to do what we like best, every pleasure is to be
            welcomed and every pain avoided. But in certain circumstances and owing to the claims of
            duty or the obligations of business it will frequently occur that pleasures have to be
            repudiated and annoyances accepted. The wise man therefore always holds in these matters
            to this principle of selection: he rejects pleasures to secure other greater pleasures,
            or else he endures pains to avoid worse pains.
          </p>
        </div>
      )}
    </div>
  );
}
