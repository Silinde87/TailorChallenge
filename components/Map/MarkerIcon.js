import React from 'react'
import { Marker } from 'react-map-gl';
import Image from 'next/image';

export default function MarkerIcon({lat, lng}) {

    return (
        <Marker latitude={lat} longitude={lng}>
            <Image src="/images/marker.png" height={25} width={25} />
        </Marker>
    )
}
