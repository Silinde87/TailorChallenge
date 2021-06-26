import React, { useEffect, useState } from 'react';
import router from 'next/router';
import { signIn, useSession } from 'next-auth/client';
import userService from '../../services/user.service';
import FormUser from '../../components/FormUser/FormUser';

const BTN_TEXT = 'Register';

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

export default function signup() {
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

	useEffect(() => {
		if (session) router.push('/');
	}, [session]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isValid()) {
			setErrorOnSubmit(false);
			const { username, password } = fields;
			userService
				.create({ username, password })
				.then(() => {
					signIn('credentials', { username: username, password: password });
				})
				.catch((err) => console.error(err));
		} else {
			setErrorOnSubmit(true);
			setTimeout(() => {
				setErrorOnSubmit(false);
			}, 1500);
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
		<main>
			<FormUser
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				errorOnSubmit={errorOnSubmit}
				btnText={BTN_TEXT}
				errors={errors}
			/>
		</main>
	);
}
