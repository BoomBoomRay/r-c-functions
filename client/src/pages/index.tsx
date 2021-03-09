import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import RedditLogo from '../../public/images/smiley-emoticon-svgrepo-com.svg';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Front page of the internet</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12'>
        <div className='flex items-center'>
          <Link href='/'>
            <a>
              <RedditLogo className='w-8 h-8 mr-2' />
            </a>
          </Link>
          <span className='text-2xl font-semibold'>
            <Link href='/'>Forum</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
