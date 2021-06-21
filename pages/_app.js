import '../styles/global.css';
import { Provider } from 'next-auth/client'
import Layout from '../components/Layout/Layout';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<Layout>
				<Component {...pageProps} />	
			</Layout>
		</Provider>
	);
}
