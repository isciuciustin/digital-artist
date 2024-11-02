import { ActionFunctionArgs } from '@remix-run/node';
import { Form, json, redirect, useActionData } from '@remix-run/react';
import CryptoJS from 'crypto-js';
import { accessToken, refreshToken, userInfo } from '~/cookies.server';

export async function action({ request }: ActionFunctionArgs) {
    const cookieHeader = request.headers.get('Cookie');

    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');
    // HASHING THE PASSWORD
    const hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

    const body = JSON.stringify({
        username: username,
        password: hash
    });
    const response = await fetch(`http://localhost:3000/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });

    const access_token_cookie = (await accessToken.parse(cookieHeader)) || {};
    const refresh_token_cookie = (await refreshToken.parse(cookieHeader)) || {};
    const user_info_token_cookie =
        (await accessToken.parse(cookieHeader)) || {};

    const data = await response.json();

    access_token_cookie.access_token = data.access_token;
    refresh_token_cookie.refresh_token = data.refresh_token;
    user_info_token_cookie.user_info = data.user_id + '_' + data.username;

    const headers = new Headers();

    headers.append(
        'Set-Cookie',
        await accessToken.serialize(access_token_cookie)
    );
    headers.append(
        'Set-Cookie',
        await refreshToken.serialize(refresh_token_cookie)
    );
    headers.append(
        'Set-Cookie',
        await userInfo.serialize(user_info_token_cookie)
    );

    const errors = {
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

    return redirect('/dashboard', { headers: headers });
}

export default function Login() {
    const actionData = useActionData<typeof action>();
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
