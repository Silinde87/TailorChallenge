import React from 'react'
import SCCardRestaurant from './CardRestaurant.styled'
import Image from 'next/image';

export default function CardRestaurant({name, image}) {
    return (
        <SCCardRestaurant>
            <Image src={image} layout="fill" />
            <h4>{name}</h4>
        </SCCardRestaurant>
    )
}
