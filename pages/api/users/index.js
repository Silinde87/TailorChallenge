import dbConnect from '../../../utils/dbConnect';
import User from './../../../models/User';
import { encryptWithAES } from './../../../utils/hashPash';

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			return getUsers();
		case 'POST':
			return createUser();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	function getUsers() {
		User.find()
			.then((users) => res.status(200).json(users))
			.catch((err) => res.status(500).json(err));
	}

	function createUser() {
		const { username, favouriteRestaurants, password } = req.body;

		if (password.length < 6) {
			return res.status(400).json({ message: 'Please make your password at least 6 characters long' });
		}

		if (!username) {
			return res.status(400).json({ message: 'Please fill all the fields in the form' });
		}

		const hashPass = encryptWithAES(password);

		User.create({ username, favouriteRestaurants, password: hashPass })
			.then((user) => res.status(201).json(user))
			.catch((err) => res.status(500).json(err));
	}
}
