import axios from 'axios';

const baseUrl = `${process.env.NEXTAUTH_URL}/api/restaurants`;

class RestaurantService {
	constructor() {
		this.instance = axios.create({
			baseURL: baseUrl,
			withCredentials: true,
		});	
	}
	
	getAll = () => this.instance.get('/');
	getById = (id) => this.instance.get(`/${id}`);
	deleteById = (id) => this.instance.delete(`/${id}`);
	create = (data) => this.instance.post('/', data);
	updateById = (id, data) => this.instance.put(`/${id}`, data);
}

const restaurantService = new RestaurantService();

export default restaurantService;
