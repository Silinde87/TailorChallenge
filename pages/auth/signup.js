import React from 'react';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function signup() {
	const [session, loading] = useSession();

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<form method="post" action="/api/users">
			<label>
				Username
				<input name="username" type="text" />
			</label>
			<label>
				Password
				<input name="password" type="password" />
			</label>
			<button type="submit">Register</button>
		</form>
	);
}
