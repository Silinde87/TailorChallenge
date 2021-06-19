import axios from 'axios';

const baseUrl = `${process.env.NEXTAUTH_URL}/api/users`;

class UserService {
	constructor() {
		this.instance = axios.create({
			baseURL: baseUrl,
			withCredentials: true,
		});
		console.log('nextauth-route', baseUrl);
	}

    getAll = () => this.instance.get('/');
	getById = (id) => this.instance.get(`/${id}`);
	deleteById = (id) => this.instance.delete(`/${id}`);
	create = (data) => this.instance.post('/', data);
	updateById = (id, data) => this.instance.put(`/${id}`, data);
}

const userService = new UserService();

export default userService;