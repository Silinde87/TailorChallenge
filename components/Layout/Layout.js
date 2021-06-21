import React from 'react';
import Head from 'next/head';
import NavBar from '../NavBar/NavBar';
import SCLayout from './Layout.styled';


export default function Layout({ children }) {
	return (
		<SCLayout>
			<Head>
				<title>TailorChallenge - Pau Rodríguez</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NavBar />
			{children}
		</SCLayout>
	);
}
