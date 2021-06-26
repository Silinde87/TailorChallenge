import React from 'react';
import Text from './../components/Text';
import styles from './../styles/restaurant.module.css';
import Mapbox from '../components/Map/Mapbox';
import ScheduleRestaurant from '../components/ScheduleRestaurant/ScheduleRestaurant';
import ReviewContainer from '../components/ReviewContainer/ReviewContainer';
import { getAllRestaurants, getRestaurantById } from '../utils/restaurants-utils';

// Return a list of possible value for id
export async function getStaticPaths() {
	let restaurants = await getAllRestaurants()
	let paths = restaurants.map(({ id }) => {
		return {
			params: {
				id: id.toString(),
			},
		};
	});
	return { paths, fallback: false };
}

// Fetch necessary data for the restaurant details using params.id
export async function getStaticProps({ params }) {
	return {
		props: {
			restaurantData: await getRestaurantById(params.id),
		},
	};
}

export default function Restaurant({ restaurantData }) {
	const { name, image, cuisine_type, neighborhood, latlng, operating_hours, reviews } = restaurantData;
	return (
		<main>
			<div className={styles.nameBox}>
				<Text as="h2" size="ml" line="ml">
					{name}
				</Text>
			</div>
			<img className={styles.img} src={image} />
			<div className={styles.typeBox}>
				<Text as="p" size="ml" line="ml">
					{cuisine_type} from {neighborhood}
				</Text>
			</div>
			<div className={styles.mapBox}>
				<Mapbox center={latlng} />
			</div>
			<ScheduleRestaurant schedule={operating_hours} />
			<ReviewContainer reviews={reviews}></ReviewContainer>
		</main>
	);
}
