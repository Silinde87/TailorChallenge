import Head from 'next/head';
import styles from './index.module.css';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useEffect } from 'react';

const Home = () => {
	const [session, loading] = useSession();

	useEffect(() => {
		console.log('front', session);
	}, [session]);

	return (
		<div className={styles.container}>
			<Head>
				<title>TailorChallenge - Pau Rodríguez</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<h1 className={styles.title}>Welcome to Next.js!</h1>
				{!session && (
					<>
						Not signed in <br />
						<button onClick={() => signIn()}>Sign in</button>
					</>
				)}
				{session && (
					<>
						Signed in as {session.user.username} <br />
						<button onClick={() => signOut()}>Sign out</button>
					</>
				)}
			</main>
		</div>
	);
};

export default Home;
