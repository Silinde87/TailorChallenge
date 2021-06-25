import { useSession } from 'next-auth/client';
import { useEffect } from 'react';

const Home = () => {
	const [session, loading] = useSession();

	return (
		<section>
			<h1>Welcome to Next.js!</h1>
		</section>
	);
};

export default Home;
