import {
    ActionFunction,
    ActionFunctionArgs,
    unstable_parseMultipartFormData
} from '@remix-run/node';
import { Form } from '@remix-run/react';

async function convertToBuffer(a: AsyncIterable<Uint8Array>) {
    const result = [];
    for await (const chunk of a) {
        result.push(chunk);
    }
    return Buffer.concat(result);
}

export const action: ActionFunction = async ({
    request
}: ActionFunctionArgs) => {
    const uploadHandler = async ({ data, key, contentType }: any) => {
        const buffer = await convertToBuffer(data);

        const formData = new FormData();
        const blob = new Blob([buffer], { type: 'application/octet-stream' });

        formData.append('file', blob, 'file.jpg');

        const send_response = await fetch(
            'http://localhost:3000/file-upload/upload',
            {
                method: 'POST',
                body: formData
            }
        );
        const json = await send_response.json();
        console.log('SEND RESPONSE : ', json);

        return key;
    };

    const formData = await unstable_parseMultipartFormData(
        request,
        uploadHandler
    );

    const fileName = formData.get('upload');

    return {
        filename: fileName
    };
};

export default function Dashboard() {
    return (
        <div>
            <div className="mb-3">
                <label
                    htmlFor="formFile"
                    className="form-label"
                >
                    Default file input example
                </label>
                <Form
                    method="post"
                    encType="multipart/form-data"
                >
                    <input
                        id="formFile"
                        type="file"
                        className="form-control"
                        name="image"
                    />
                    <button>Upload</button>
                </Form>
            </div>
        </div>
    );
}
