import axios from 'axios';

const baseUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/users`;

class UserService {
	constructor() {
		this.instance = axios.create({
			baseURL: baseUrl,
			withCredentials: true,
		});
	}

	getById = (id) => this.instance.get(`/${id}`);
	deleteById = (id) => this.instance.delete(`/${id}`);
	create = (data) => this.instance.post('/', data);
	updateById = (id, data) => this.instance.post(`/${id}`, data);
}

const userService = new UserService();

export default userService;
