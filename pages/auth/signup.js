import React, { useState } from 'react';
import router from 'next/router';
import { signIn, useSession } from 'next-auth/client';
import userService from '../../services/user.service';
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

export default function signup({ csrfToken }) {
	const [session, setSession] = useSession();
	const [fields, setFields] = useState({
		username: '',
		password: '',
	});
	const [errors, setErrors] = useState({
		username: null,
		password: null,
	});
	const [errorOnSubmit, setErrorOnSubmit] = useState(false);

	const isValid = () => {
		return !Object.keys(errors).some((key) => errors[key] !== undefined);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorOnSubmit(true);
		if (isValid()) {
			setErrorOnSubmit(false);
			const { username, password } = fields;
			await userService.create({ username, password });
			await signIn('credentials', { username: username, password: password })			
			router.push('/');
		}
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
		<form>
			<label>
				Username
				<input name="username" type="text" onChange={handleChange} />
			</label>
			{errors['username'] && <p>{errors['username']}</p>}
			<label>
				Password
				<input name="password" type="password" onChange={handleChange} />
			</label>
			{errors['password'] && <p>{errors['password']}</p>}
			<button onClick={handleSubmit}>Register</button>
			{errorOnSubmit && <p>There is an error on submit</p>}
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
