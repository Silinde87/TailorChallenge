import { render, screen } from '../utils/test-utils';
import Home from './../pages/index';
import { useSession } from "next-auth/client";

jest.mock('next-auth/client');

test('Test', () => {
	useSession.mockReturnValueOnce([false, false])
	
	render(<Home />);

	//const title = screen.getByRole('heading', { name: /Welcome to Next.js!/i });
	//expect(title).toBeTruthy();
});
