import { json, redirect, useLoaderData } from '@remix-run/react';
import { useState } from 'react';

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
export default function Work() {
    const loader = useLoaderData() as Loader;
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    return (
        <div>
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
                                        // navigate(`/dashboard/modal/${post.id}`);
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
                className="modal fade w-100 h-100"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-lg w-100 h-100">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="staticBackdropLabel"
                            >
                                {title}
                            </h5>
                            <button
                                onClick={() => {
                                    setImage('');
                                    setTitle('');
                                    setDescription('');
                                }}
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row ">
                                <img
                                    className="img-fluid w-100 h-200"
                                    alt=""
                                    src={image}
                                />
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
