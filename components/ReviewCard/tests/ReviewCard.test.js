import { render, screen } from '../../../utils/test-utils';
import ReviewCard from '../ReviewCard';
import { useSession } from 'next-auth/client';

jest.mock('next-auth/client');

const name = 'name';
const date = 'date';
const rating = 5;
const comments = 'comments';

describe('Renders ReviewCard', () => {
	useSession.mockReturnValueOnce([false, false]);

	test('with three <p> elements', () => {
		render(<ReviewCard name={name} date={date} rating={rating} comments={comments} />);
		const text1 = screen.getByText(name);
		const text2 = screen.getByText(date);
		const text3 = screen.getByText(comments);

		expect(text1).toBeInTheDocument();
		expect(text2).toBeInTheDocument();
		expect(text3).toBeInTheDocument();
	});

    test('with rating in defined format', () => {
        render(<ReviewCard rating={rating} />);
        const ratingText = screen.getByText('/5', {exact:false})
        
        expect(ratingText).toHaveTextContent(rating)
    })
});
