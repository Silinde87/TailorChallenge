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

				const user = data.find((user) => {
					const decryptedPass = decryptWithAES(user.password);
					return user.username === username && decryptedPass === password;
				});				

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
	//Custom auth pages
	pages: {
		signIn: '/auth/login',
		// signOut: '/auth/signout',
		// error: '/auth/error', // Error code passed in query string as ?error=
		// verifyRequest: '/auth/verify-request', // (used for check email message)
		// newUser: null // If set, new users will be directed here on first sign in
	},
	site: process.env.NEXTAUTH_URL || "localhost:3000",

	database: process.env.DBURL,
	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	theme: 'light',
}

export default (req, res) => NextAuth(req, res, options);
