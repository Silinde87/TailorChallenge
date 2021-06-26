import React, { useEffect, useState } from 'react';
import { getCsrfToken } from 'next-auth/client';
import FormUser from '../../components/FormUser/FormUser';

const METHOD = 'post';
const ACTION_URL = '/api/auth/callback/credentials';
const TYPE = 'submit';
const BTN_TEXT = 'Log in';

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
		if (isValid() || Object.values(errors).every((x) => x === null)) setErrorOnSubmit(false);
		else setErrorOnSubmit(true);
	}, [errors]);

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
		<main>
			<FormUser
				method={METHOD}
				actionUrl={ACTION_URL}
				csrfToken={csrfToken}
				handleChange={handleChange}
				errorOnSubmit={errorOnSubmit}
				type={TYPE}
				btnText={BTN_TEXT}
				errors={errors}
			/>
		</main>
	);
}

export async function getServerSideProps(context) {
	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
	};
}
