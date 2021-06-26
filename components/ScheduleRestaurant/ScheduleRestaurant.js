import React from 'react';
import SCScheduleRestaurant from './ScheduleRestaurant.styled';
import { Table } from 'react-bootstrap';
import Text from './../Text';

export default function ScheduleRestaurant({ schedule }) {
	const scheduleList = Object.entries(schedule);

	return (
		<SCScheduleRestaurant>
			<Text as="p" size="ml" line="ml" margin="0 0 5px 0">Opening hours</Text>
			<Table responsive size="sm">
				<tbody>
					{scheduleList.map((el, i) => {
						return (
							<tr key={i}>
								<td>{el[0]}</td>
								<td>{el[1]}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</SCScheduleRestaurant>
	);
}
