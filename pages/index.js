import CardRestaurant from './../components/CardRestaurant/CardRestaurant';
import styles from './../styles/index.module.css';

export async function getStaticProps() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/restaurants`);
	const restaurants = await res.json();

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
