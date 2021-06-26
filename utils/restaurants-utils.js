import restaurantService from '../services/restaurant.service';

export async function getAllRestaurants() {
	let restaurants = [];

	await restaurantService
		.getAll()
		.then((res) => (restaurants = res.data))
		.catch((err) => console.error('error', err));
	return restaurants;
}

export async function getRestaurantById(id) {
	let restaurantData;

	await restaurantService
		.getById(id)
		.then(({ data }) => (restaurantData = data))
		.catch((err) => console.error(err));

	return restaurantData;
}
