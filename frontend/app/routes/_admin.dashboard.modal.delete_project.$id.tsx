import { ActionFunctionArgs, redirect } from '@remix-run/node';

export const action = async ({ params }: ActionFunctionArgs) => {
    const add_project = await fetch(
        `http://localhost:3000/projects/delete_project/${params.id}/`,
        {
            method: 'DELETE'
        }
    );
    const jsonData = await add_project.json();
    return redirect('/dashboard');
};
