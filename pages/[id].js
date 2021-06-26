import React, { useEffect, useState } from 'react';
import Text from './../components/Text';
import styles from './../styles/restaurant.module.css';
import Mapbox from '../components/Map/Mapbox';
import ScheduleRestaurant from '../components/ScheduleRestaurant/ScheduleRestaurant';
import ReviewContainer from '../components/ReviewContainer/ReviewContainer';
import {
	addFavouriteRestaurant,
	deleteFavouriteRestaurant,
	getAllRestaurants,
	getRestaurantById,
} from '../utils/restaurants-utils';
import { useSession } from 'next-auth/client';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

// Return a list of possible value for id
export async function getStaticPaths() {
	let restaurants = await getAllRestaurants();
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
	const { id, name, image, cuisine_type, neighborhood, latlng, operating_hours, reviews, address } =
		restaurantData;
	const [session, setSession] = useSession();
	const [isFavourite, setIsFavourite] = useState(
		session ? session.user.favouriteRestaurants.includes(id) : false
	);

	const handleFavClick = () => {
		if (session) {
			if (isFavourite) {
				deleteFavouriteRestaurant(id, session.user);
				setIsFavourite(false);
			} else {
				addFavouriteRestaurant(id, session.user);
				setIsFavourite(true);
			}
		}
	};

	return (
		<main className={styles.restaurantDetailsContainer}>
			<div className={styles.nameBox}>
				<Text as="h2" size="ml" line="ml" margin="0 5px 0 0">
					{name}
				</Text>
				{isFavourite ? (
					<StarIcon className={styles.star} onClick={handleFavClick} />
				) : (
					<StarBorderIcon className={styles.star} onClick={handleFavClick} />
				)}
			</div>
			<img className={styles.img} src={image} />
			<div className={styles.typeBox}>
				<Text as="p" size="m" line="m">
					<b>
						Cuisine {cuisine_type} at {neighborhood}
					</b>
				</Text>
			</div>
			<div className={styles.mapBox}>
				<Mapbox center={latlng} address={address} />
			</div>
			<ScheduleRestaurant schedule={operating_hours} />
			<ReviewContainer reviews={reviews}></ReviewContainer>
		</main>
	);
}
