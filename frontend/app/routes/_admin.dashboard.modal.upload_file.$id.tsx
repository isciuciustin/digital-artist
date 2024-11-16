import {
    ActionFunctionArgs,
    unstable_parseMultipartFormData,
    UploadHandlerPart
} from '@remix-run/node';
import { redirect } from 'react-router';
import Authentication from '~/functions/Authentication';

export const action = async ({ request, params }: ActionFunctionArgs) => {
    const access_token = await Authentication(request, 'action');
    try {
        const uploadHandler = async (part: UploadHandlerPart) => {
            const { name, filename, data } = part;

            if (name !== 'image') {
                return;
            } else {
                console.log(name, filename);
            }

            const chunks = [];
            for await (const chunk of data) chunks.push(chunk);
            const buffer = Buffer.concat(chunks);

            const formData = new FormData();
            const blob = new Blob([buffer], {
                type: 'application/octet-stream'
            });

            formData.append('file', blob, filename);

            const send_response = await fetch(
                'http://localhost:3000/file-upload/upload',
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + access_token
                    },
                    body: formData
                }
            );
            const response = await send_response.json();

            return response.filePath;
        };
        const form = await unstable_parseMultipartFormData(
            request,
            uploadHandler
        );
        const add_image_key = await fetch(
            `http://localhost:3000/projects/add_image_key/${params.id}/${
                form.get('image')?.toString().split('/')[1]
            }`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: 'Bearer ' + access_token
                }
            }
        );
        await add_image_key.json();
        return redirect(
            `/dashboard/modal/${params.id}?image_path=${
                form.get('image')?.toString().split('/')[1]
            }`
        );
    } catch (e) {
        return { error: e };
    }
};
