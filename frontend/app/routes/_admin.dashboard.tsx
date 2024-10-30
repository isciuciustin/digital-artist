import {
    Form,
    json,
    redirect,
    useFetcher,
    useLoaderData,
    useNavigate,
    useParams
} from '@remix-run/react';
import { ChangeEvent, useState } from 'react';

export async function loader() {
    const get_posts = await fetch(`http://localhost:3000/posts/get_posts`, {
        method: 'GET'
    });
    const jsonData = await get_posts.json();
    return json({ posts: jsonData });
}

export const action = async () => {
    const add_post = await fetch(`http://localhost:3000/posts/add_post`, {
        method: 'POST',
        body: JSON.stringify({
            title: '',
            description: '',
            image_key: ''
        })
    });
    const jsonData = await add_post.json();
    return redirect(`/dashboard/modal/${jsonData.id}`);
};

interface Post {
    id: number;
    title: string;
    description: string;
    image_key: string;
}
interface Loader {
    posts: Array<Post>;
}

export default function Dashboard() {
    const params = useParams();
    const fetcher = useFetcher();
    const navigate = useNavigate();
    const loader = useLoaderData() as Loader;

    const [file, setFile] = useState<File>();
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

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
        setImage(
            'http://localhost:3000/uploads/' + json.filePath.split('/')[1]
        );
        json = await add_image_key.json();
    };
    return (
        <div>
            <Form
                method="POST"
                className="d-flex justify-content-center"
            >
                <button
                    className="btn btn-primary mt-5"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                >
                    Add Post
                </button>
            </Form>
            <div className="container-fluid mt-5 me-2 ms-2 ">
                <div
                    className="w-100 h-100 row row-cols-1 row-cols-sm-2 row-cols-md-3 mt-3 md:gap-3"
                    style={{ maxHeight: '200px' }}
                >
                    {Array.isArray(loader.posts) &&
                        loader.posts.map((post: Post) => {
                            return (
                                <button
                                    key={post.id}
                                    className="col"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                    style={{
                                        border: 'none',
                                        backgroundColor: 'transparent'
                                    }}
                                    onClick={() => {
                                        setImage(
                                            `http://localhost:3000/uploads/${post.image_key}`
                                        );
                                        setTitle(post.title);
                                        setDescription(post.description);
                                        navigate(`/dashboard/modal/${post.id}`);
                                    }}
                                >
                                    <img
                                        style={{ objectFit: 'fill' }}
                                        className=" w-100 h-100"
                                        src={`http://localhost:3000/uploads/${post.image_key}`}
                                        alt=""
                                    />
                                </button>
                            );
                        })}
                </div>
            </div>
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
                                onClick={() => {
                                    setImage('');
                                    setTitle('');
                                    setDescription('');
                                    navigate('/dashboard');
                                }}
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
                                        {image ? (
                                            <>
                                                <img
                                                    className="img-fluid w-100"
                                                    alt=""
                                                    src={image}
                                                />
                                                <label
                                                    htmlFor="formFile"
                                                    className="form-label"
                                                >
                                                    Upload another image
                                                </label>

                                                <input
                                                    onChange={handleFileChange}
                                                    className="form-control"
                                                    type="file"
                                                    id="formFile"
                                                />
                                                <button
                                                    className="btn btn-primary mt-3"
                                                    name="action"
                                                    onClick={handleUploadClick}
                                                >
                                                    Change Image
                                                </button>
                                            </>
                                        ) : (
                                            <>
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
                                                    className="btn btn-primary mt-3"
                                                    name="action"
                                                    onClick={handleUploadClick}
                                                >
                                                    Upload Image
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="col">
                                    <fetcher.Form
                                        method="POST"
                                        action={`/dashboard/modal/${params.id}`}
                                    >
                                        <div className="mb-3 row d-flex justify-content-center">
                                            <label
                                                htmlFor="Title"
                                                className="form-label"
                                            >
                                                Title*
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                className="form-control"
                                                id="Title"
                                                placeholder="Write a title"
                                                value={title}
                                                onChange={(e) => {
                                                    setTitle(e.target.value);
                                                }}
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
                                                name="description"
                                                rows={3}
                                                value={description}
                                                onChange={(e) => {
                                                    setDescription(
                                                        e.target.value
                                                    );
                                                }}
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={fetcher.state != 'idle'}
                                            className="btn btn-primary"
                                        >
                                            {fetcher.state == 'idle'
                                                ? 'Update post'
                                                : 'Updating...'}
                                        </button>
                                    </fetcher.Form>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <fetcher.Form
                                method="POST"
                                action={`/dashboard/modal/delete_post/${params.id}`}
                            >
                                <button
                                    onClick={() => {
                                        setImage('');
                                        setTitle('');
                                        setDescription('');
                                    }}
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    type="submit"
                                    className="btn btn-outline-danger"
                                >
                                    Delete this post
                                </button>
                            </fetcher.Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
