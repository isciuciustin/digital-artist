import { ActionFunctionArgs } from '@remix-run/node';
import { Form, json, redirect, useActionData } from '@remix-run/react';
import CryptoJS from 'crypto-js';

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');

    // HASHING THE PASSWORD
    const hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    const headers = {
        'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
        username: username,
        password: hash
    });
    const response = await fetch(`http://localhost:3000/users/login`, {
        method: 'POST',
        headers,
        body
    });
    const data = await response.json();
    let errors = {
        password: '',
        login_error: ''
    };

    if (String(password).length < 8) {
        errors['password'] = 'Password should be at least 8 characters';
    }

    if (data.message == 'LOGIN FAILED') {
        errors['login_error'] = 'Username or password incorrect!';
    }
    if (errors.password || errors.login_error) {
        return json({ errors });
    }

    return redirect('/dashboard');
}

export default function Login() {
    const actionData = useActionData<typeof action>();
    console.log('Action ', actionData);
    return (
        <div className="d-flex justify-content-center">
            <Form
                method="POST"
                className="w-50 md-w-75 mt-5"
            >
                <h1>Login</h1>
                <div className="mb-3 row">
                    <div className="col-sm-10">
                        <label htmlFor="username">Username</label>
                        <input
                            name="username"
                            type="text"
                            id="username"
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="mb-3 row">
                    <div className="col-sm-10">
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            id="password"
                            type="password"
                            className="form-control"
                        />
                        {actionData?.errors?.password ? (
                            <div
                                className="alert alert-danger mt-3"
                                role="alert"
                            >
                                <em>{actionData?.errors.password}</em>
                            </div>
                        ) : actionData?.errors?.login_error ? (
                            <div
                                className="alert alert-danger mt-3"
                                role="alert"
                            >
                                <em>{actionData?.errors.login_error}</em>
                            </div>
                        ) : null}
                    </div>
                </div>
                <button className="btn btn-outline-primary">Login</button>
            </Form>
        </div>
    );
}
