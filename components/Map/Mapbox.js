import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState, useRef, useCallback } from 'react';
import ReactMapGL from 'react-map-gl';
import MarkerIcon from './MarkerIcon';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Mapbox({ center }) {
	// Map setup
	const [viewport, setViewport] = useState({
		latitude: center.lat,
		longitude: center.lng,
		zoom: 12,
		bearing: 0,
		pitch: 0,
	});

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
            <MarkerIcon lat={center.lat} lng={center.lng} />

		</ReactMapGL>
	);
}
