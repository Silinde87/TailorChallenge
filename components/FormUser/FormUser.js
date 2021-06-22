import React from 'react'
import SCFormUser from './FormUser.styled'
import { Button, Form } from 'react-bootstrap';

export default function FormUser({method, actionUrl, csrfToken, handleChange, handleSubmit, errorOnSubmit, type, btnText}) {        

    return (
        <SCFormUser method={method} action={actionUrl}>
			{csrfToken && <input name="csrfToken" type="hidden" defaultValue={csrfToken} />}
			<Form.Group>
				<Form.Label>Username</Form.Label>
				<input className="form-control" name="username" type="text" onChange={handleChange} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Password</Form.Label>
				<input className="form-control" name="password" type="password" onChange={handleChange} />
			</Form.Group>
			<Button type={type} disabled={errorOnSubmit} onClick={handleSubmit}>{btnText}</Button>
        </SCFormUser>        
    )
}
