import React, { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import CardRestaurant from './../components/CardRestaurant/CardRestaurant';
import styles from './../styles/index.module.css';
import Text from '../components/Text';
import restaurantService from './../services/restaurant.service';

export async function getStaticProps() {
	let restaurants = [];

	// Fetching data from API and passing it as props to component
	await restaurantService
		.getAll()
		.then((res) => (restaurants = res.data))
		.catch((err) => console.error('error', err));

	if (!restaurants) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			restaurants,
		},
	};
}

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
			{getFavouriteRestaurants().length === 0 ? (
				<Text as="h3" size="l" line="l" margin="20px 0 0 0" className={styles.noRestaurantText}>
					There is no restaurants in your favourites list.
				</Text>
			) : (
				<section className={styles.restaurantContainer}>{displayRestaurants()}</section>
			)}
		</main>
	);
}

export default Favourites;
