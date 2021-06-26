import React from 'react'
import { Marker } from 'react-map-gl';
import Image from 'next/image';

export default function MarkerIcon({lat, lng, onClick, className}) {

    return (
        <Marker latitude={lat} longitude={lng} onClick={onClick}>
            <Image src="/images/marker.png" height={30} width={30} className={className}/>
        </Marker>
    )
}
