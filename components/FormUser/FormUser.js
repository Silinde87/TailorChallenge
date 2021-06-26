import React from 'react';
import SCFormUser from './FormUser.styled';
import { Button, Form } from 'react-bootstrap';
import Text from './../Text';

export default function FormUser({
	method,
	actionUrl,
	csrfToken,
	handleChange,
	handleSubmit,
	errorOnSubmit,
	type,
	btnText,
	errors,
}) {
	console.log(errorOnSubmit)
	return (
		<SCFormUser method={method} action={actionUrl}>
			{csrfToken && <input name="csrfToken" type="hidden" defaultValue={csrfToken} />}
			<Form.Group>
				<Form.Label>Username</Form.Label>
				<input className="form-control" name="username" type="text" onChange={handleChange} />
				{errors && (
					<Text size="m" line="m" margin="5px 0 0 0" color="lettersColorRed">
						{errors.username}
					</Text>
				)}
			</Form.Group>
			<Form.Group>
				<Form.Label>Password</Form.Label>
				<input className="form-control" name="password" type="password" onChange={handleChange} />
				{errors && (
					<Text size="m" line="m" margin="5px 0 0 0" color="lettersColorRed">
						{errors.password}
					</Text>
				)}
			</Form.Group>
			<Button variant="outline-success" type={type} disabled={errorOnSubmit} onClick={handleSubmit}>
				{btnText}
			</Button>
			{errorOnSubmit && (
				<Text className="errorOnSubmitLabel" size="m" line="m" margin="5px 0 0 0" color="lettersColorRed">
					You should fill in all fields
				</Text>
			)}
		</SCFormUser>
	);
}
