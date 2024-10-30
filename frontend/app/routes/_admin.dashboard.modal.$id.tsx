import { ActionFunction, ActionFunctionArgs, redirect } from '@remix-run/node';
import { useState } from 'react';

export const action: ActionFunction = async ({
    request
}: ActionFunctionArgs) => {
    const headers = {
        'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
        title: '',
        description: '',
        image_key: ''
    });
    const add_post = await fetch(
        'http://localhost:3000/posts/add_post',

        {
            method: 'POST',
            headers,
            body
        }
    );
    const response = await add_post.json();
    console.log(response.id);
    return redirect(`/dashboard/modal/${response.id}`);
};

export default function DashboardModal() {
    return <div></div>;
}
