import { render, screen } from '../../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import ReviewContainer from '../ReviewContainer';
import restaurants from './../../../data/restaurants.json';

jest.mock('next-auth/client');

const { reviews } = restaurants[0];

describe('Renders ReviewContainer', () => {
	test('with three reviews', () => {
		render(<ReviewContainer reviews={reviews} />);

		const reviewsList = screen.getAllByRole('article');
		expect(reviewsList.length).toBe(3);
	});
	test('with accordion that changes his text when clicks', () => {
		render(<ReviewContainer reviews={reviews} />);

		let textButton = screen.getByRole('heading', { name: /last reviews/i });
		expect(textButton).toHaveTextContent('Show');

        //Click once and changes to "Hide"
		const accordion = screen.getByRole('button');
        userEvent.click(accordion);
        textButton = screen.getByRole('heading', { name: /last reviews/i });
        expect(textButton).toHaveTextContent('Hide');

        //Click again and changes to "Show"
        userEvent.click(accordion);
        textButton = screen.getByRole('heading', { name: /last reviews/i });
        expect(textButton).toHaveTextContent('Show');
	});
    test('with at least one review when uncollapsed', () => {
        render(<ReviewContainer reviews={reviews} />);
        
        const accordion = screen.getByRole('button');
        userEvent.click(accordion);

        const review = screen.getAllByRole('article');
        expect(review.length).toBeTruthy();
    })
});
