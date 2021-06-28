import data from './../../../data/restaurants.json';

export default function handler(req, res) {
	const { method } = req;
	
	switch (method) {
		case 'GET':
			getRestaurants();
			break;
		default:
			res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	function getRestaurants() {
		const restaurants = data;
		res.status(200).json(restaurants);
	}
}
