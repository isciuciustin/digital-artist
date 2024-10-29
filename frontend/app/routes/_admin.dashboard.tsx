import {
    ActionFunction,
    ActionFunctionArgs,
    unstable_parseMultipartFormData
} from '@remix-run/node';
import { Form, redirect } from '@remix-run/react';

async function convertToBuffer(a: AsyncIterable<Uint8Array>) {
    const result = [];
    for await (const chunk of a) {
        result.push(chunk);
    }
    return Buffer.concat(result);
}

// export const action: ActionFunction = async ({
//     request
// }: ActionFunctionArgs) => {
//     const uploadHandler = async ({ data, key, contentType }: any) => {
//         const buffer = await convertToBuffer(data);

//         const formData = new FormData();
//         const blob = new Blob([buffer], { type: 'application/octet-stream' });

//         formData.append('file', blob, 'file.jpg');

//         const send_response = await fetch(
//             'http://localhost:3000/file-upload/upload',
//             {
//                 method: 'POST',
//                 body: formData
//             }
//         );
//         const json = await send_response.json();
//         console.log('SEND RESPONSE : ', json);

//         return key;
//     };

//     const formData = await unstable_parseMultipartFormData(
//         request,
//         uploadHandler
//     );

//     const fileName = formData.get('upload');

//     return {
//         filename: fileName
//     };
// };

export const action: ActionFunction = async ({
    request
}: ActionFunctionArgs) => {
    const headers = {
        'Content-Type': 'application/json'
    };
    const body = JSON.stringify({
        title: '',
        description: '',
        image_key: ''
    });
    const add_post = await fetch(
        'http://localhost:3000/posts/add_post',

        {
            method: 'POST',
            headers,
            body
        }
    );
    const response = await add_post.json();
    console.log(response.id);
    return redirect(`/dashboard/${response.id}`);
};
export default function Dashboard() {
    return (
        <div className="d-flex justify-content-center">
            <Form method="POST">
                <button
                    type="submit"
                    className="btn btn-primary mt-5"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                >
                    Add Post
                </button>
            </Form>
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="staticBackdropLabel"
                            >
                                Add a post
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row row-cols-2">
                                <div className="col d-flex justify-content-center">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="formFile"
                                            className="form-label"
                                        >
                                            Upload an image
                                        </label>
                                        <input
                                            className="form-control"
                                            type="file"
                                            id="formFile"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="mb-3 row d-flex justify-content-center">
                                        <label
                                            htmlFor="Title"
                                            className="form-label"
                                        >
                                            Title*
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="Title"
                                            placeholder="Write a title"
                                        />
                                    </div>
                                    <div className="mb-3 row  d-flex justify-content-center">
                                        <label
                                            htmlFor="Description"
                                            className="form-label"
                                        >
                                            Description*
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="Description"
                                            rows={3}
                                        ></textarea>
                                    </div>
                                    <button className="btn btn-primary">
                                        Add post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
