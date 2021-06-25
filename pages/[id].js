import React, { useEffect } from 'react';
import restaurantService from '../services/restaurant.service';


// Return a list of possible value for id
export async function getStaticPaths() {
    let paths;
    
	await restaurantService
        .getAll()
        .then(({ data }) => {
            paths = data.map(({ id }) => {
                return {
                    params: {
                        id: id.toString(),
                    },
                };
            });
        })
        .catch((err) => console.error(err));
    
    return { paths, fallback: false };
}

// Fetch necessary data for the restaurant details using params.id
export async function getStaticProps({ params }) {
    let restaurantData;
    
	await restaurantService
        .getById(params.id)
        .then(({ data }) => (restaurantData = data))
        .catch((err) => console.error(err));
    
	return {
        props: {
            restaurantData,
		},
	};
}

export default function Restaurant({ restaurantData }) {
    return <div></div>;
}