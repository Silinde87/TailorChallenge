import { useSession } from 'next-auth/client';
import { useEffect } from 'react';
import restaurantService from '../services/restaurant.service';
import CardRestaurant from './../components/CardRestaurant/CardRestaurant';
import styles from './../styles/index.module.css';

const Home = ({ restaurants }) => {
	const [session, loading] = useSession();

	const displayRestaurants = () => {
		return restaurants.map(({ id, name, image }) => {
			return <CardRestaurant key={id} id={id} name={name} image={image} />;
		});
	};

	return (
		<main>
			<section className={styles.restaurantContainer}>{restaurants && displayRestaurants()}</section>
		</main>
	);
};

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

export default Home;
