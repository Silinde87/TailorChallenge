import React from 'react'
import SCCardRestaurant from './CardRestaurant.styled'
import Text from './../Text';
import Link from 'next/link'

export default function CardRestaurant({id, name, image}) {    
    return (
        <Link href={`/${id}`}>
            <SCCardRestaurant>
                <img src={image} />
                <Text as="h4" weight="sansSerif" size="ml" line="ml" margin="5px 0 0 0">{name}</Text>
            </SCCardRestaurant>
        </Link>
    )
}
