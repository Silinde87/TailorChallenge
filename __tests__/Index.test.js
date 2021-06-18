import { render, screen } from '@testing-library/react';
import Home from './../pages/index';

test('Test', () => {
	render(<Home />);

	const title = screen.getByRole('heading', { name: /Welcome to Next.js!/i });
	expect(title).toBeTruthy();
});
