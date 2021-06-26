import React, { useState } from 'react';
import SCReviewContainer from './ReviewContainer.styled';
import Text from './../Text';
import ReviewCard from '../ReviewCard/ReviewCard';

export default function ReviewContainer({ reviews }) {
	const [isActivedReviews, setIsActivedReviews] = useState(false);

	const showAndHideReviews = () => {
		isActivedReviews ? setIsActivedReviews(false) : setIsActivedReviews(true);
	};

	return (
		<SCReviewContainer>
			{isActivedReviews ? (
				<Text as="h4" size="m" line="m" onClick={showAndHideReviews}>
					Hide last reviews
				</Text>
			) : (
				<Text as="h4" size="m" line="m" onClick={showAndHideReviews}>
					Show last reviews
				</Text>
			)}
			{isActivedReviews &&
				reviews.map((review, i) => (
					<ReviewCard
						key={i}
						name={review.name}
						date={review.date}
						rating={review.rating}
						comments={review.comments}
					/>
				))}
		</SCReviewContainer>
	);
}
