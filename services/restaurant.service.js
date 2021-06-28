import axios from 'axios';

const baseUrl = `${process.env.API_URL}/api/restaurants`;

class RestaurantService {
	constructor() {
		this.instance = axios.create({
			baseURL: baseUrl,
			withCredentials: true,
		});
	}
	
	getAll = () => this.instance.get('/');
	getById = (id) => this.instance.get(`/${id}`);
}

const restaurantService = new RestaurantService();

export default restaurantService;
