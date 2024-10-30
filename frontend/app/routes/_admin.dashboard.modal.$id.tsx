import { ActionFunction, ActionFunctionArgs, redirect } from '@remix-run/node';
import { useState } from 'react';

export const action = async ({ request, params }) => {
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const add_post = await fetch(
        `http://localhost:3000/posts/update_post/${params.id}/${title}/${description}`,
        {
            method: 'PATCH'
        }
    );
    const jsonData = await add_post.json();
    console.log('RESPONSE ADD POST : ', jsonData);
    return null;
};
export default function DashboardModal() {
    return <div></div>;
}
