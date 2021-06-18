import { restaurantsRepo } from '../../../utils/restaurants-helper';

export default function handler(req, res) {
	const { id } = req.query;

	switch (req.method) {
		case 'GET':
			return getRestaurantById();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	function getRestaurantById() {
		const restaurants = restaurantsRepo.getById(id);
		return res.status(200).json(restaurants);
	}
}
