import { ActionFunctionArgs, redirect } from '@remix-run/node';

export const action = async ({ params }: ActionFunctionArgs) => {
    const add_post = await fetch(
        `http://localhost:3000/posts/delete_post/${params.id}/`,
        {
            method: 'DELETE'
        }
    );
    const jsonData = await add_post.json();
    console.log('RESPONSE DELETE POST : ', jsonData);
    return redirect('/dashboard');
};
