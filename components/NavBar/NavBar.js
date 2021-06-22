import React from 'react';
import SCNavBar from './NavBar.styled';
import { signIn, signOut } from 'next-auth/client';
import Link from 'next/link';
import { withAuth } from '../../context/auth.context';
import { Button } from 'react-bootstrap';

function NavBar({user, isLoggedIn}) {

	return (
		<SCNavBar>
			{!isLoggedIn && (
				<>
					Not signed in <br />
					<Button onClick={() => signIn()}>Log in</Button>
					<Link href="/auth/signup">
						<Button>Register</Button>
					</Link>
				</>
			)}
			{isLoggedIn && (
				<>
					Signed in as {user.username} <br />
					<Button onClick={() => signOut()}>Sign out</Button>
				</>
			)}
		</SCNavBar>
	);
}

export default withAuth(NavBar);