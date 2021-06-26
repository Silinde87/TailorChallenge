import { useSession } from 'next-auth/client';
import CardRestaurant from './../components/CardRestaurant/CardRestaurant';
import styles from './../styles/index.module.css';
import { getAllRestaurants } from '../utils/restaurants-utils';

const Home = ({ restaurants }) => {
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
	return {
		props: {
			restaurants: await getAllRestaurants(),
		},
	};
}

export default Home;
