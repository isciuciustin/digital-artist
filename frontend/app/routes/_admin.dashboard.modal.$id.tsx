import { ActionFunctionArgs } from '@remix-run/node';

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const title = formData.get('title') || '';
    const description = formData.get('description') || '';
    const add_post = await fetch(
        `http://localhost:3000/posts/update_post/${params.id}`,
        {
            method: 'PATCH',
            body: JSON.stringify({
                title: title,
                description: description
            })
        }
    );
    const jsonData = await add_post.json();
    console.log('RESPONSE ADD POST : ', jsonData);
    return null;
};

export default function DashboardModal() {
    return <div></div>;
}
