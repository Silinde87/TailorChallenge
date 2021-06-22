import React, { useEffect, useState } from 'react';
import { getCsrfToken } from 'next-auth/client';

const validators = {
	username: (value) => {
		let message;
		if (!value) message = 'Username is required';
		return message;
	},
	password: (value) => {
		let message;
		if (!value) message = 'Password is required';
		else if (value.length < 6) message = 'Invalid password';
		return message;
	},
};

export default function Login({ csrfToken }) {
	const [fields, setFields] = useState({
		username: '',
		password: '',
	});
	const [errors, setErrors] = useState({
		username: null,
		password: null,
	});
	const [errorOnSubmit, setErrorOnSubmit] = useState(true);

	useEffect(() => {
		if(isValid()) setErrorOnSubmit(false)
		else setErrorOnSubmit(true);

	}, [errors])

	const isValid = () => {
		return !Object.keys(errors).some((key) => errors[key] !== undefined);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFields({
			...fields,
			[name]: value,
		});
		setErrors({
			...errors,
			[name]: validators[name](value),
		});
	};

	return (
		<form method="post" action="/api/auth/callback/credentials">
			<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
			<label>
				Username
				<input name="username" type="text" onChange={handleChange} />
			</label>
			<label>
				Password
				<input name="password" type="password" onChange={handleChange} />
			</label>
			<button type="submit" disabled={errorOnSubmit}>Log in</button>			
		</form>
	);
}

export async function getServerSideProps(context) {
	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
	};
}
