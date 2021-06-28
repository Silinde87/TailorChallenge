import userService from '../services/user.service';

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
