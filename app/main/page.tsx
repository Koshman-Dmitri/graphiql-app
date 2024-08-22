import Link from 'next/link';
import styles from './page.module.css';

export default function MainPage() {
  const isAuthenticated = true;

  const generalInfo = (
    <>
      <h3>General information about the developers, project, and course:</h3>
      <p>
        The standard Lorem Ipsum passage, used since the 1500s Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
        in culpa qui officia deserunt mollit anim id est laborum. Section 1.10.32 of de Finibus
        Bonorum et Malorum, written by Cicero in 45 BC Sed ut perspiciatis unde omnis iste natus
        error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
        ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. No one
        rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who
        do not know how to pursue pleasure rationally encounter consequences that are extremely
        painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself,
        because it is pain, but because occasionally circumstances occur in which toil and pain can
        procure him some great pleasure.
      </p>
      <p>
        NTemporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet
        ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic
        tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
        perferendis doloribus asperiores repellat. 1914 translation by H. Rackham On the other hand,
        we denounce with righteous indignation and dislike men who are so beguiled and demoralized
        by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the
        pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their
        duty through weakness of will, which is the same as saying through shrinking from toil and
        pain. These cases are perfectly simple and easy to distinguish.
      </p>
    </>
  );

  if (!isAuthenticated) {
    return (
      <div className={styles.mainContent}>
        <h1>Welcome!</h1>
        {generalInfo}
        <div className={styles.mainLinks}>
          <Link href="/sign-in" className={`buttonLink ${styles.buttonLinkMain}`}>
            Sign In
          </Link>
          <Link href="/sign-up" className={`buttonLink ${styles.buttonLinkMain}`}>
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mainContent}>
      <h2>Welcome Back, [Username]!</h2>
      {generalInfo}
      <div className={styles.mainLinks}>
        <Link href="/rest-client" className={`buttonLink ${styles.buttonLinkMain}`}>
          REST Client
        </Link>
        <Link href="/graphiql-client" className={`buttonLink ${styles.buttonLinkMain}`}>
          GraphiQL Client
        </Link>
        <Link href="/history" className={`buttonLink ${styles.buttonLinkMain}`}>
          History
        </Link>
      </div>
    </div>
  );
}
