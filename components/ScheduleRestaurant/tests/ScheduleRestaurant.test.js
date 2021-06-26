import { render, screen } from '../../../utils/test-utils';
import ScheduleRestaurant from '../ScheduleRestaurant';
import restaurants from './../../../data/restaurants.json';

jest.mock('next-auth/client');

const { operating_hours } = restaurants[0];
const scheduleList = Object.entries(operating_hours);

describe('Renders ScheduleRestaurant component', () => {
	test('with heading with defined text', () => {
		render(<ScheduleRestaurant schedule={scheduleList} />);
		const heading = screen.getByRole('heading', { name: /opening hours/i });

		expect(heading).toBeInTheDocument();
	});
	test('with 7 rows, each per day', () => {
		render(<ScheduleRestaurant schedule={scheduleList} />);
		const rows = screen.getAllByRole('row');

		expect(rows.length).toBe(7);
	});
	test('with a cell with monday text', () => {
		render(<ScheduleRestaurant schedule={scheduleList} />);
		const cellMonday = screen.getByRole('cell', { name: /monday/i });

		expect(cellMonday).toHaveTextContent('Monday');
	});
});
