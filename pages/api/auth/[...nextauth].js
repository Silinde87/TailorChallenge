import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import userService from './../../../services/user.service';
import { decryptWithAES } from './../../../utils/hashPash';

const options = {
	providers: [
		Providers.Credentials({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'credentials',

            // The fields of the form
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'Introduce your name' },
				password: { label: 'Password', type: 'password', placeholder: 'Introduce your password' },
			},

            // Authorization logic
			async authorize(credentials) {
				const { username, password } = credentials;
				const { data } = await userService.getAll();
				console.log('data',data);

				const user = data.find((user) => {
					const decryptedPass = decryptWithAES(user.password);
					return user.username === username && decryptedPass === password;
				});
				console.log('user', user);

				// If no error and we have user data, return it
				if (user) return user;
				// Return null if user data could not be retrieved
				return null;
			},
		})
	],
    // This passes user info to frontend
	callbacks: {
		async signIn(user) {
			return user;
		},
		async session(session, token) {
			session.user = token.user;
			return session;
		},
		async jwt(token, user) {
			if (user) token.user = user;
			return token;
		},
	},

	database: process.env.DBURL,
	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	theme: 'light',
	pages: {
		signIn: '/auth/login',
	  }
}

export default (req, res) => NextAuth(req, res, options);
