import { useSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import restaurantService from '../services/restaurant.service';
import CardRestaurant from './../components/CardRestaurant/CardRestaurant';

const Home = () => {
	const [session, loading] = useSession();
	const [restaurants, setRestaurants] = useState();

	useEffect(() => {
		restaurantService.getAll()
			.then((res) => setRestaurants(res.data))
			.catch((err) => console.error('error', err));
	}, []);

	const displayRestaurants = () => {
		return restaurants.map(({name,image}) => {
			return <CardRestaurant name={name} image={image}/>
		})
	}

	return (
		<section>
			<h1>Welcome to Next.js!</h1>
			{
				restaurants && (					
					displayRestaurants()
				) 
			}
		</section>
	);
};

export default Home;
