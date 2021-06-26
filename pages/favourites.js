import React, { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import CardRestaurant from './../components/CardRestaurant/CardRestaurant';
import styles from './../styles/index.module.css';
import { getAllRestaurants } from '../utils/restaurants-utils';
import Text from '../components/Text';

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
					There is no restaurant in your favourites list.
				</Text>
			) : (
				<section className={styles.restaurantContainer}>{displayRestaurants()}</section>
			)}
		</main>
	);
}

export async function getStaticProps() {
	return {
		props: {
			restaurants: await getAllRestaurants(),
		},
	};
}

export default Favourites;
