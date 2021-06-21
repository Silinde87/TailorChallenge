import { useSession } from 'next-auth/client';
import { useEffect } from 'react';

const Home = () => {
	const [session, loading] = useSession();

	useEffect(() => {
		//console.log('front', session);
	}, [session]);

	return (
		<section>
			<h1>Welcome to Next.js!</h1>
		</section>
	);
};

export default Home;
