import { json, useLoaderData } from '@remix-run/react';

export async function loader() {
    const get_projects = await fetch(
        `http://localhost:3000/projects/get_projects_non_hidden`,
        {
            method: 'GET'
        }
    );
    const jsonData = await get_projects.json();
    console.log('json data', jsonData);
    return json({ projects: jsonData });
}

interface Project {
    id: number;
    title: string;
    description: string;
    image_key: string;
}
interface Loader {
    projects: Array<Project>;
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
                    {loader?.projects[0] && (
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                    )}
                    {loader?.projects[1] && (
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                    )}
                    {loader?.projects[2] && (
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                    )}
                </div>
                <div className="carousel-inner">
                    {loader?.projects[0] && (
                        <div
                            className="carousel-item active"
                            data-bs-interval="2000"
                        >
                            <img
                                src={`http://localhost:3000/uploads/${loader.projects[0].image_key}`}
                                className=" w-100 "
                                style={{ height: '70vh', objectFit: 'cover' }}
                                alt=""
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{loader.projects[0].title}</h5>
                                    <p>{loader.projects[0].description}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {loader?.projects[1] && (
                        <div
                            className="carousel-item"
                            data-bs-interval="2000"
                        >
                            <img
                                src={`http://localhost:3000/uploads/${loader.projects[1].image_key}`}
                                className=" w-100 "
                                style={{ height: '70vh', objectFit: 'cover' }}
                                alt=""
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{loader?.projects[1]?.title}</h5>
                                <p>{loader?.projects[1]?.description}</p>
                            </div>
                        </div>
                    )}

                    {loader?.projects[2] && (
                        <div
                            className="carousel-item"
                            data-bs-interval="2000"
                        >
                            <img
                                src={`http://localhost:3000/uploads/${loader.projects[2].image_key}`}
                                className="w-100"
                                style={{ height: '70vh', objectFit: 'cover' }}
                                alt=""
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{loader.projects[2].title}</h5>
                                <p>{loader.projects[2].description}</p>
                            </div>
                        </div>
                    )}
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
