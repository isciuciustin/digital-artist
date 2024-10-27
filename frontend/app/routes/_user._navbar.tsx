export default function Navbar() {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid justify-content-start">
                <a
                    className="navbar-brand"
                    href="/"
                >
                    <h1>Digital Artist</h1>
                </a>
                <div className="ms-5">
                    <a
                        className="nav-item text-dark text-decoration-none mx-2"
                        href="/about"
                    >
                        <h2>About</h2>
                    </a>
                    <a
                        className="nav-item text-dark text-decoration-none mx-2"
                        href="/work"
                    >
                        <h2>Work</h2>
                    </a>
                </div>
            </div>
        </nav>
    );
}
