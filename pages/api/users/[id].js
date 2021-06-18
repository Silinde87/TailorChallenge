import dbConnect from '../../../utils/dbConnect';
import User from './../../../models/User';

export default async function handler(req, res) {
	const { id } = req.query;

	await dbConnect();

	switch (req.method) {
		case 'GET':
			return getUserById();
		case 'PUT':
			return updateUser();
		case 'DELETE':
			return deleteUser();
		default:
			return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	function getUserById() {
        User.findById(id)
            .then(user => res.status(200).json(user))
            .catch(err => res.status(500).json(err));
	}

	function updateUser() {
        console.log(`id: ${id} <-`)
        User.findByIdAndUpdate({ _id: id }, { ...req.body }, { new: true })
            .then(user => res.status(200).json(user))
            .catch(err => res.status(500).json(err));
	}

	function deleteUser() {
        User.findByIdAndRemove(id)
            .then(() =>res.status(200).json({ message: 'User removed' }))
            .catch(err => res.status(500).json(err));
	}
}
