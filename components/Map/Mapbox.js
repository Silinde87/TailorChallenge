import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState, useRef, useCallback } from 'react';
import ReactMapGL, { Popup } from 'react-map-gl';
import MarkerIcon from './MarkerIcon';
import Text from './../Text';
import styles from './../../styles/restaurant.module.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Mapbox({ center, address }) {
	// Map setup
	const [viewport, setViewport] = useState({
		latitude: center.lat,
		longitude: center.lng,
		zoom: 12,
		bearing: 0,
		pitch: 0,
	});
	const [showPopup, togglePopup] = useState(false);

	// Handling viewport location
	const geocoderContainerRef = useRef();
	const mapRef = useRef();
	const handleViewportChange = useCallback((newViewport) => setViewport(newViewport), []);

	return (
		<ReactMapGL
			ref={mapRef}
			{...viewport}
			width="100%"
			height="100%"
			mapStyle="mapbox://styles/mapbox/light-v10"
			onViewportChange={handleViewportChange}
			mapboxApiAccessToken={MAPBOX_TOKEN}
		>
			<MarkerIcon lat={center.lat} lng={center.lng} onClick={togglePopup} className={styles.markerIcon}/>
			{showPopup && (
				<Popup
					latitude={center.lat}
					longitude={center.lng}
					closeButton={true}
					closeOnClick={false}
					onClose={() => togglePopup(false)}
					anchor="top"
					offsetTop={30}
					offsetLeft={15}
				>
					<Text size="s" line="s">{address}</Text>
				</Popup>
			)}
		</ReactMapGL>
	);
}
