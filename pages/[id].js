import React, { useEffect } from 'react';
import restaurantService from '../services/restaurant.service';
import Text from './../components/Text';
import styles from './../styles/restaurant.module.css';
import Mapbox from '../components/Map/Mapbox';

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
    const { name, image, cuisine_type, neighborhood,latlng } = restaurantData;
    return (
        <main>
            <div className={styles.nameBox}>
                <Text as="h2" size="ml" line="ml">{name}</Text>
            </div>
            <img className={styles.img} src={image} />
            <div className={styles.typeBox}>
                <Text as="p" size="ml" line="ml">{cuisine_type} from {neighborhood}</Text>
            </div>
            <div className={styles.mapBox}>
                <Mapbox center={latlng}/>
            </div>
            <div className={styles.scheduleBox}></div>
            <div className={styles.reviewContainer}></div>                        
        </main>
    );
}