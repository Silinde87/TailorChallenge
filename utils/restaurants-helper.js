let restaurants = require('./../data/restaurants.json');

export const restaurantsRepo = {
	getAll,
	getById,
	delete: _delete,
	update: update,
	create: create,
};

function getAll() {
	return restaurants;
}

function getById(id) {
	return restaurants.find((el) => el.id.toString() === id.toString());
}

function _delete(id) {
	restaurants = restaurants.filter((el) => el.id.toString() !== id.toString());
	return restaurants;
}

function update(
	id,
	{ name, neighborhood, photograph, address, latlng, image, cuisine_type, operating_hours, reviews }
) {
	const params = {
		name,
		neighborhood,
		photograph,
		address,
		latlng,
		image,
		cuisine_type,
		operating_hours,
		reviews,
	};
	const restaurant = restaurants.find((el) => el.id.toString() === id.toString());
	Object.assign(restaurant, params);
}

function create({
	name,
	neighborhood,
	photograph,
	address,
	latlng,
	image,
	cuisine_type,
	operating_hours,
	reviews,
}) {
	const restaurant = {
		id: restaurants.length ? Math.max(...restaurants.map((el) => el.id)) + 1 : 1,
		name,
		neighborhood,
		photograph,
		address,
		latlng,
		image,
		cuisine_type,
		operating_hours,
		reviews,
	};
	restaurants.push(restaurant);
}
