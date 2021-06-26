import React from 'react';
import SCCardRestaurant from './CardRestaurant.styled';
import Text from './../Text';
import Link from 'next/link';
import Image from 'next/image';
import { shimmer, toBase64 } from '../../utils/skeletons-utils';

const HEIGHT = 200;
const WIDTH = 225;

export default function CardRestaurant({ id, name, image }) {
	return (
		<Link href={`/${id}`}>
			<SCCardRestaurant>
				<Image
					alt="rest-picture"
					src={image}
					height={HEIGHT}
					width={WIDTH}
					placeholder="blur"
					blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(HEIGHT, WIDTH))}`}
				/>
				<Text as="h4" weight="sansSerif" size="ml" line="ml" margin="5px 0 0 0">
					{name}
				</Text>
			</SCCardRestaurant>
		</Link>
	);
}
