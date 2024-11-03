import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import {
    Form,
    json,
    redirect,
    useFetcher,
    useLoaderData,
    useLocation,
    useNavigate,
    useParams
} from '@remix-run/react';
import { useEffect, useState } from 'react';
import Authentication from '~/functions/Authentication';

export async function loader({ request }: LoaderFunctionArgs) {
    const access_token = await Authentication(request, 'loader');

    let get_projects = await fetch(
        `http://localhost:3000/projects/get_projects`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        }
    );
    get_projects = await get_projects.json();
    return json({ projects: get_projects });
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const access_token = await Authentication(request, 'action');
    let add_project = await fetch(
        `http://localhost:3000/projects/add_project`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + access_token
            },
            body: JSON.stringify({
                title: '',
                description: '',
                image_key: '',
                hidden: false,
                customer_link: ''
            })
        }
    );
    add_project = await add_project.json();
    return redirect(`/dashboard/modal/${add_project?.id}`);
};

interface Project {
    id: number;
    title: string;
    description: string;
    image_key: string;
    customer_link: string;
    hidden: boolean;
}
interface Loader {
    projects: Array<Project>;
}

export default function Dashboard() {
    const params = useParams();
    const fetcher = useFetcher();
    const navigate = useNavigate();
    const loader = useLoaderData() as Loader;
    const location = useLocation();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [customer_link, set_customer_link] = useState('');
    const [hidden, setHidden] = useState(false);
    const [image, setImage] = useState('');

    useEffect(() => {
        setImage(location.search.split('=')[1]);
    }, [location.search]);

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
                    Add Project
                </button>
            </Form>
            <div className="container-fluid mt-5 me-2 ms-2 ">
                <div className="w-100 h-100 row row-cols-1 row-cols-sm-2 row-cols-md-3 mt-3 md:gap-3">
                    {Array.isArray(loader.projects) &&
                        loader.projects.map((project: Project) => {
                            return (
                                <button
                                    key={project.id}
                                    className="col"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                    style={{
                                        border: 'none',
                                        backgroundColor: 'transparent'
                                    }}
                                    onClick={() => {
                                        setTitle(project.title);
                                        setDescription(project.description);
                                        set_customer_link(
                                            project.customer_link
                                        );
                                        setHidden(project.hidden);
                                        setImage(
                                            `uploads/${project.image_key}`
                                        );
                                        navigate(
                                            `/dashboard/modal/${project.id}?image_path=uploads/${project.image_key}`
                                        );
                                    }}
                                >
                                    <img
                                        style={{ objectFit: 'fill' }}
                                        className=" w-100 h-100"
                                        src={`http://localhost:3000/uploads/${project.image_key}`}
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
                                Add a project
                            </h5>
                            <button
                                onClick={() => {
                                    setTitle('');
                                    setDescription('');
                                    set_customer_link('');
                                    setHidden(false);
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
                                                <Form
                                                    method="POST"
                                                    encType="multipart/form-data"
                                                    action={`/dashboard/modal/upload_file/${params.id}`}
                                                >
                                                    <img
                                                        className="img-fluid w-100"
                                                        alt=""
                                                        src={`http://localhost:3000/${image}`}
                                                    />
                                                    <label
                                                        htmlFor="formFile2"
                                                        className="form-label"
                                                    >
                                                        Upload another image
                                                    </label>

                                                    <input
                                                        accept="image/png,  image/jpeg"
                                                        className="form-control"
                                                        type="file"
                                                        id="formFile2"
                                                        name="image"
                                                    />
                                                    <button
                                                        className="btn btn-primary mt-3"
                                                        type="submit"
                                                    >
                                                        Change Image
                                                    </button>
                                                </Form>
                                            </>
                                        ) : (
                                            <>
                                                <fetcher.Form
                                                    method="POST"
                                                    encType="multipart/form-data"
                                                    action={`/dashboard/modal/upload_file/${params.id}`}
                                                >
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
                                                        accept="image/png,image/jpeg"
                                                        name="image"
                                                    />
                                                    <button
                                                        className="btn btn-primary mt-3"
                                                        type="submit"
                                                    >
                                                        Upload Image
                                                    </button>
                                                </fetcher.Form>
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
                                                Title
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
                                                Description
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
                                        <div className="form-check form-switch mt-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="switch"
                                                name="hidden"
                                                checked={hidden}
                                                onChange={() => {
                                                    setHidden(!hidden);
                                                }}
                                            />
                                            <label
                                                className="form-check-label "
                                                htmlFor="switch"
                                            >
                                                Hide this project
                                            </label>
                                        </div>
                                        <div className="mb-3 row d-flex justify-content-center mt-3">
                                            <label
                                                htmlFor="customer_link"
                                                className="form-label"
                                            >
                                                Customer Website
                                            </label>
                                            <input
                                                type="text"
                                                name="customer_link"
                                                className="form-control"
                                                id="customer_link"
                                                placeholder="Write a url"
                                                value={customer_link}
                                                onChange={(e) => {
                                                    set_customer_link(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={fetcher.state != 'idle'}
                                            className="btn btn-primary"
                                        >
                                            {fetcher.state == 'idle'
                                                ? 'Update project'
                                                : 'Updating...'}
                                        </button>
                                    </fetcher.Form>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <fetcher.Form
                                method="POST"
                                action={`/dashboard/modal/delete_project/${params.id}`}
                            >
                                <button
                                    onClick={() => {
                                        setTitle('');
                                        setDescription('');
                                        setHidden(false);
                                        set_customer_link('');
                                    }}
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    type="submit"
                                    className="btn btn-outline-danger"
                                >
                                    Delete this project
                                </button>
                            </fetcher.Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
