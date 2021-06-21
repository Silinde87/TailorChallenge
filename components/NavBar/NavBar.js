import React from 'react';
import SCNavBar from './NavBar.styled';
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';

export default function NavBar() {
	const [session, loading] = useSession();

	return (
		<SCNavBar>
			{!session && (
				<>
					Not signed in <br />
					<button onClick={() => signIn()}>Log in</button>
					<Link href="/auth/signup">
						<button>Register</button>
					</Link>
				</>
			)}
			{session && (
				<>
					Signed in as {session.user.username} <br />
					<button onClick={() => signOut()}>Sign out</button>
				</>
			)}
		</SCNavBar>
	);
}
