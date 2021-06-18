import { restaurantsRepo } from '../../../utils/restaurants-helper';

export default function handler(req, res) {
	const { id } = req.query;

	switch (req.method) {
		case 'GET':
			return getRestaurantById();
		case 'PUT':
			return updateRestaurant();
		case 'DELETE':
			return deleteRestaurant();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
	function getRestaurantById() {
		const restaurants = restaurantsRepo.getById(id);
		if (restaurants) return res.status(200).json(restaurants);
		else return res.status(405).end(`There is no Restaurant with id: ${id}`);
	}

	function updateRestaurant() {
		try {
			restaurantsRepo.update(id, req.body);
			return res.status(200).json({});
		} catch (error) {
			return res.status(400).json({ message: error });
		}
	}

	function deleteRestaurant() {
		restaurantsRepo.delete(id);
		return res.status(200).json({});
	}
}
