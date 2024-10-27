export default function About() {
    return (
        <div className="d-flex justify-content-center">
            <div className="  mt-5">
                <h5 className="d-flex justify-content-center">Contact:</h5>
                <a
                    className="d-flex justify-content-center"
                    href="mailto:email@example.com"
                >
                    <h2>email@example.com</h2>
                </a>
                <h2 className="d-flex justify-content-center">
                    Instagram:
                    <a
                        target="blank"
                        className="text-warning"
                        href="https://www.instagram.com/"
                    >
                        @example
                    </a>
                </h2>
                <h5 className="mt-5 d-flex justify-content-center">About:</h5>
                <p className="lead  d-flex justify-content-center">
                    I am a constant begginer, a creator, an unfamiliar with
                    convention.
                </p>
                <h5 className="mt-5  d-flex justify-content-center">Press:</h5>
                <a
                    target="blank"
                    href="https://www.wikipedia.org/"
                >
                    <h4 className=" d-flex justify-content-center">Article</h4>
                </a>
                <h5 className="mt-5 d-flex justify-content-center">Awards:</h5>
                <a
                    target="blank"
                    className="text-decoration-none  d-flex justify-content-center"
                    href="https://www.lumenprize.com/"
                >
                    <h4 className="text-warning ">Lumen</h4>
                </a>
            </div>
        </div>
    );
}
