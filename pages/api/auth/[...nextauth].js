import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';
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
			authorize: async (credentials) => {
				
				const { username, password } = credentials;
				await dbConnect();

				const theUser = await User.findOne({username})
					.then((userFound) => {
						if(userFound){							
							const decryptedPass = decryptWithAES(userFound.password);
							const user = {...userFound._doc};				
							if(decryptedPass == password){
								return user;
							} else {
								console.log('pass NOT match');
							} 
						}else{
							console.log('user not found');
						} 
					})
					.catch(err => console.error('error', err));


				//If no error and we have user data, return it
				if (theUser) return theUser;
				//Return null if user data could not be retrieved
				return null;
			},
		}),
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
			const newUser = { ...user };
			delete newUser.password;
			if (user) token.user = newUser;
			return token;
		},
	},
	//Custom auth pages
	pages: {
		signIn: '/auth/login',
	},
	site: process.env.NEXT_PUBLIC_NEXTAUTH_URL || 'http://localhost:3000',

	database: process.env.DBURL,
	session: {
		jwt: true,
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	theme: 'light',
};

export default (req, res) => NextAuth(req, res, options);
