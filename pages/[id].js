import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import Text from './../components/Text';
import styles from './../styles/restaurant.module.css';
import { addFavouriteRestaurant, deleteFavouriteRestaurant } from '../utils/restaurants-utils';
import { useSession } from 'next-auth/client';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { Tooltip } from '@material-ui/core';
import restaurantService from '../services/restaurant.service';

// Using next's import dynamic to improve performance. First Load JS: 395kb to 130kb
const ScheduleRestaurant = dynamic(() => import('../components/ScheduleRestaurant/ScheduleRestaurant'));
const ReviewContainer = dynamic(() => import('../components/ReviewContainer/ReviewContainer'));
const Mapbox = dynamic(() => import('../components/Map/Mapbox'));

// Return a list of possible value for id
export async function getStaticPaths() {
	let restaurants = [];

	await restaurantService
		.getAll()
		.then((res) => (restaurants = res.data))
		.catch((err) => console.error('error', err));

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
	let restaurantData;

	await restaurantService
		.getById(params.id)
		.then(({ data }) => (restaurantData = data))
		.catch((err) => console.error(err));

	return {
		props: {
			restaurantData,
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
	const [showTooltip, setShowTooltip] = useState(false);

	const handleFavClick = () => {
		if (session) {
			if (isFavourite) {
				deleteFavouriteRestaurant(id, session.user);
				setIsFavourite(false);
			} else {
				addFavouriteRestaurant(id, session.user);
				setIsFavourite(true);
			}
		} else {
			setShowTooltip(true);
			setTimeout(() => {
				setShowTooltip(false);
			}, 2500);
		}
	};

	return (
		<main className={styles.restaurantDetailsContainer}>
			<div className={styles.nameBox}>
				<Text as="h2" size="ml" line="ml" margin="0 5px 0 0">
					{name}
				</Text>
				<Tooltip title="Log in to add your favorite market" open={showTooltip} placement="right">
					{isFavourite ? (
						<StarIcon className={styles.star} onClick={handleFavClick} />
					) : (
						<StarBorderIcon className={styles.star} onClick={handleFavClick} />
					)}
				</Tooltip>
			</div>
			<img className={styles.img} src={image} />
			<section className={styles.typeBox}>
				<Text as="p" size="m" line="m">
					<b>
						Cuisine {cuisine_type} at {neighborhood}
					</b>
				</Text>
			</section>
			<section className={styles.mapBox}>
				<Mapbox center={latlng} address={address} />
			</section>
			<ScheduleRestaurant schedule={operating_hours} />
			<ReviewContainer reviews={reviews}></ReviewContainer>
		</main>
	);
}
