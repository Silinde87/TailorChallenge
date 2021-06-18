const restaurants = require('./../data/restaurants.json');

export const restaurantsRepo = {
	getAll,
	getById,
};

function getAll() {
	return restaurants;
}

function getById(id) {
	return restaurants.find((el) => el.id.toString() === id.toString());
}
