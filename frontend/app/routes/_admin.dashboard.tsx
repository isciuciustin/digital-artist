import { Form, Outlet, useParams } from '@remix-run/react';
import { ChangeEvent, useState } from 'react';

export default function Dashboard() {
    const params = useParams();
    const [file, setFile] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = async () => {
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('file', file, file.name);
        const send_response = await fetch(
            'http://localhost:3000/file-upload/upload',
            {
                method: 'POST',
                body: formData
            }
        );
        let json = await send_response.json();
        const add_image_key = await fetch(
            `http://localhost:3000/posts/add_image_key/${params.id}/${
                json.filePath.split('/')[1]
            }`,
            {
                method: 'PATCH'
            }
        );
        json = await add_image_key.json();
    };

    return (
        <div className="d-flex justify-content-center">
            <Form
                method="POST"
                action={`/dashboard/modal/${params.id}`}
            >
                <button
                    className="btn btn-primary mt-5"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                >
                    Add Post
                </button>
            </Form>
            <Outlet />
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
                                            onChange={handleFileChange}
                                            className="form-control"
                                            type="file"
                                            id="formFile"
                                        />
                                        <button
                                            name="action"
                                            onClick={handleUploadClick}
                                        >
                                            Upload Image
                                        </button>
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
