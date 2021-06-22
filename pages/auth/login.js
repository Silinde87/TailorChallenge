import React, { useState } from 'react';
import { getCsrfToken } from 'next-auth/client';

export default function Login({ csrfToken }) {
	const [fields, setFields] = useState({
		username: '',
		password: '',
	});
	const [errorOnSubmit, setErrorOnSubmit] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFields({
			...fields,
			[name]: value,
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
			<button type="submit">Log in</button>
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
