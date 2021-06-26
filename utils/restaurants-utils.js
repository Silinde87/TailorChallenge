import restaurantService from '../services/restaurant.service';
import userService from '../services/user.service';

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

export async function addFavouriteRestaurant(restId, user) {
	user.favouriteRestaurants.push(restId);
	await userService
		.updateById(user._id, user)
		.catch((err) => console.error(err));
}

export async function deleteFavouriteRestaurant(restId, user) {
	let index = user.favouriteRestaurants.findIndex((el) => el == restId);
	if (index > -1) user.favouriteRestaurants.splice(index, 1);
	await userService
		.updateById(user._id, user)
		.catch((err) => console.error(err));
}
