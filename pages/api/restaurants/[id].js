import data from './../../../data/restaurants.json';

export default function handler(req, res) {
	const { id } = req.query;
	const { method } = req;

	switch (method) {
		case 'GET':
			getRestaurantById();
			break;
		default:
			res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	function getRestaurantById() {
		const restaurants = data.find((el) => el.id.toString() === id.toString());
		if (restaurants) res.status(200).json(restaurants);
		else res.status(405).end(`There is no Restaurant with id: ${id}`);
	}
}
