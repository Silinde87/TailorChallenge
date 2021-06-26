import React from 'react'
import SCReviewCard from './ReviewCard.styled';
import Text from './../Text';

export default function ReviewCard({name, date, rating, comments}) {
    return (
        <SCReviewCard>
            <Text size="m" line="m"><strong>{name}</strong> - {rating}/5</Text>
            <Text size="s" line="s">{date}</Text>
            <Text size="m" line="m">{comments}</Text>
        </SCReviewCard>
    )
}
