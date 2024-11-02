import { ActionFunctionArgs, redirect } from '@remix-run/node';
import Authentication from '~/functions/Authentication';

export const action = async ({ params, request }: ActionFunctionArgs) => {
    const access_token = await Authentication(request);
    let delete_project = await fetch(
        `http://localhost:3000/projects/delete_project/${params.id}/`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        }
    );
    await delete_project.json();
    return redirect('/dashboard');
};
