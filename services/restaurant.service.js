import axios from 'axios';

const baseUrl = 'http://localhost:3000/restaurants';

export default class RestaurantService {
	constructor() {
		this.instance = axios.create({
			baseURL: baseUrl,
			withCredentials: true,
		});
	}
	getAll = () => this.instance.get('/');
	getById = (id) => this.instance.get(`/${id}`);
	deleteById = (id) => this.this.instance.delete(`/${id}`);
	create = (data) => this.instance.post('/', data);
	updateById = (id, data) => this.instance.put(`/${id}`, data);
}
