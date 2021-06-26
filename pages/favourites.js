import React, { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import restaurantService from '../services/restaurant.service';
import CardRestaurant from './../components/CardRestaurant/CardRestaurant';
import styles from './../styles/index.module.css';

function Favourites({ restaurants }) {
	const [session, loading] = useSession();
	let user;

	if (session) user = session.user;

	function getFavouriteRestaurants() {
		if (user) {
			return restaurants.filter((rest) => user.favouriteRestaurants.includes(rest.id));
		} else {
			return [];
		}
	}

	const displayRestaurants = () => {
		return getFavouriteRestaurants().map(({ id, name, image }) => {
			return <CardRestaurant key={id} id={id} name={name} image={image} />;
		});
	};

	return (
		<main>
			<section className={styles.restaurantContainer}>{displayRestaurants()}</section>
		</main>
	);
}

export async function getStaticProps() {
	let restaurants = [];

	await restaurantService
		.getAll()
		.then((res) => (restaurants = res.data))
		.catch((err) => console.error('error', err));

	return {
		props: {
			restaurants,
		},
	};
}

export default Favourites;
