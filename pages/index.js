import CardRestaurant from './../components/CardRestaurant/CardRestaurant';
import styles from './../styles/index.module.css';
import restaurantService from '../services/restaurant.service';

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

export default Home;
