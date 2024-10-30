import { ActionFunctionArgs } from '@remix-run/node';

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const hidden = formData.get('hidden') == 'on' ? true : false;
    const customer_link = formData.get('customer_link');

    const add_project = await fetch(
        `http://localhost:3000/projects/update_project/${params.id}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                hidden: hidden,
                customer_link: customer_link
            })
        }
    );
    const jsonData = await add_project.json();

    return null;
};

export default function DashboardModal() {
    return <div></div>;
}
