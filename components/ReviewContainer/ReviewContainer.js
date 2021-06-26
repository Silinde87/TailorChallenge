import React, { useState } from 'react';
import SCReviewContainer from './ReviewContainer.styled';
import Text from './../Text';
import ReviewCard from '../ReviewCard/ReviewCard';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function ReviewContainer({ reviews }) {
	const [isActivedReviews, setIsActivedReviews] = useState(false);

	const showAndHideReviews = () => {
		isActivedReviews ? setIsActivedReviews(false) : setIsActivedReviews(true);
	};

	return (
		<SCReviewContainer>
			<Accordion>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
					onClick={showAndHideReviews}
				>
					{isActivedReviews ? (
						<Text as="h4" size="m" line="m">
							Hide last reviews
						</Text>
					) : (
						<Text as="h4" size="m" line="m">
							Show last reviews
						</Text>
					)}
				</AccordionSummary>
				{reviews.map((review, i) => (
					<AccordionDetails key={i}>
						<ReviewCard
							name={review.name}
							date={review.date}
							rating={review.rating}
							comments={review.comments}
						/>
					</AccordionDetails>
				))}
			</Accordion>
		</SCReviewContainer>
	);
}
