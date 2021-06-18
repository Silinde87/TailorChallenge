import Head from 'next/head'
import styles from './index.module.css'

const Home = () => (
  <div className={styles.container}>
    <Head>
      <title>TailorChallenge - Pau Rodríguez</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1 className={styles.title}>
        Welcome to Next.js!
      </h1>
    </main>
  </div>
)

export default Home
