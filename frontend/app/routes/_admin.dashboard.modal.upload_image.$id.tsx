import {
    ActionFunction,
    ActionFunctionArgs,
    unstable_parseMultipartFormData
} from '@remix-run/node';

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
    const uploadHandler = async ({ data, key }: any) => {
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

        return key;
    };

    const formData = await unstable_parseMultipartFormData(
        request,
        uploadHandler
    );

    const fileName = formData.get('upload');
    console.log('FILENAME : ', fileName);
    return {
        filename: fileName
    };
};
