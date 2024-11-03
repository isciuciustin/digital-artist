import { ActionFunctionArgs } from '@remix-run/node';
import Authentication from '~/functions/Authentication';

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const access_token = await Authentication(request, 'action');
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const hidden = formData.get('hidden') == 'on' ? true : false;
    const customer_link = formData.get('customer_link');

    let add_project = await fetch(
        `http://localhost:3000/projects/update_project/${params.id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + access_token
            },
            body: JSON.stringify({
                title: title,
                description: description,
                hidden: hidden,
                customer_link: customer_link
            })
        }
    );
    add_project = await add_project.json();

    return null;
};

export default function DashboardModal() {
    return <div></div>;
}
