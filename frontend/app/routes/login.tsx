import { ActionFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');
    console.log('Username  ' + username);
    console.log('Password  ' + password);
    return null;
}

export default function Login() {
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
                    </div>
                </div>
                <button className="btn btn-outline-primary">Login</button>
            </Form>
        </div>
    );
}
