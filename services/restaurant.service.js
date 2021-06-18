import { fetchWrapper } from '../utils/fetch-wrapper';

export const restaurantService = {
	getAll,
	getById,
};

const baseUrl = 'http://localhost:3000/restaurants';

function getAll() {
	return fetchWrapper.get(baseUrl);
}

function getById(id) {
	return fetchWrapper.get(`${baseUrk}/${id}`);
}
