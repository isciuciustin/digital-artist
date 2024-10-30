import { json, useLoaderData } from '@remix-run/react';

export async function loader() {
    const get_posts = await fetch(`http://localhost:3000/posts/get_posts`, {
        method: 'GET'
    });
    const jsonData = await get_posts.json();
    return json({ posts: jsonData });
}

interface Post {
    id: number;
    title: string;
    description: string;
    image_key: string;
}
interface Loader {
    posts: Array<Post>;
}
export default function Index() {
    const loader = useLoaderData() as Loader;
    return (
        <>
            <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-bs-ride="carousel"
            >
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                    ></button>
                    <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                    ></button>
                </div>
                <div className="carousel-inner">
                    <div
                        className="carousel-item active"
                        data-bs-interval="2000"
                    >
                        <img
                            src={`http://localhost:3000/uploads/${loader.posts[0].image_key}`}
                            className=" w-100 "
                            style={{ height: '70vh', objectFit: 'cover' }}
                            alt=""
                        />
                        <div className="carousel-caption d-none d-md-block">
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{loader.posts[0].title}</h5>
                                <p>{loader.posts[0].description}</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="carousel-item"
                        data-bs-interval="2000"
                    >
                        <img
                            src={`http://localhost:3000/uploads/${loader.posts[1].image_key}`}
                            className=" w-100 "
                            style={{ height: '70vh', objectFit: 'cover' }}
                            alt=""
                        />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{loader.posts[1].title}</h5>
                            <p>{loader.posts[1].description}</p>
                        </div>
                    </div>
                    <div
                        className="carousel-item"
                        data-bs-interval="2000"
                    >
                        <img
                            src={`http://localhost:3000/uploads/${loader.posts[2].image_key}`}
                            className="w-100"
                            style={{ height: '70vh', objectFit: 'cover' }}
                            alt=""
                        />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{loader.posts[2].title}</h5>
                            <p>{loader.posts[2].description}</p>
                        </div>
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    );
}
