import { Provider } from 'next-auth/client';
import Head from 'next/head';
import GlobalStyle from '../styles/global.styled';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import NavBar from '../components/NavBar/NavBar';
import AuthProvider from '../context/auth.context';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<AuthProvider>
				<Head>
					<title>TailorChallenge - Pau Rodríguez</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<GlobalStyle />
				<ThemeProvider theme={theme}>
					<NavBar />
					<Component {...pageProps} />
				</ThemeProvider>
			</AuthProvider>
		</Provider>
	);
}
