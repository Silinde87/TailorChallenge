import React, { useEffect } from 'react';
import SCNavBar from './NavBar.styled';
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import { withAuth } from '../../context/auth.context';
import { Button } from 'react-bootstrap';
import Text from '../Text';
import userService from './../../services/user.service';

function NavBar({ user, isLoggedIn }) {
	const [session, setSession] = useSession();
	
	const deleteAccount = () => {
		userService
			.deleteById(user._id)
			.then(() => signOut())
			.catch((err) => console.error(err));
	};

	return (
		<SCNavBar>
			<div className="restButtonsBox">
				<Link href="/">
					<Button size="sm" variant="outline-dark">
						<Text as="m" weight="sansSerif" size="s" line="s">
							All Rests
						</Text>
					</Button>
				</Link>
				<Link href="/favourites">
					<Button size="sm" variant="outline-dark">
						<Text as="m" weight="sansSerif" size="s" line="s">
							Fav Rests
						</Text>
					</Button>
				</Link>
			</div>
			<div className="logButtonsBox">
				{!isLoggedIn && (
					<>
						<Button size="sm" variant="outline-dark" onClick={() => signIn()}>
							<Text as="m" weight="sansSerif" size="s" line="s">
								Log in
							</Text>
						</Button>
						<Link href="/auth/signup">
							<Button size="sm" variant="outline-dark">
								<Text as="m" weight="sansSerif" size="s" line="s">
									Register
								</Text>
							</Button>
						</Link>
					</>
				)}
				{isLoggedIn && (
					<>
						<Text as="p" weight="sansSerif" size="m" line="m">
							Welcome back {user.username}
						</Text>
						<Button size="sm" variant="outline-dark" onClick={() => signOut()}>
							Sign out
						</Button>
						<Button size="sm" variant="outline-danger" onClick={() => deleteAccount()}>
							Delete
						</Button>
					</>
				)}
			</div>
		</SCNavBar>
	);
}

export default withAuth(NavBar);
