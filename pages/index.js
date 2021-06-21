import styles from './index.module.css';
import { useSession } from 'next-auth/client';
import { useEffect } from 'react';

const Home = () => {
	const [session, loading] = useSession();

	useEffect(() => {
		//console.log('front', session);
	}, [session]);

	return (
		<section className={styles.container}>
			<h1 className={styles.title}>Welcome to Next.js!</h1>
		</section>
	);
};

export default Home;
