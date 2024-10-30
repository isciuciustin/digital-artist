import { useLocation } from '@remix-run/react';

export default function Navbar() {
    const location = useLocation();
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid justify-content-start">
                <a
                    className="navbar-brand"
                    href={
                        location.pathname.includes('dashboard')
                            ? '/dashboard'
                            : '/'
                    }
                >
                    <h1>
                        {location.pathname.includes('dashboard')
                            ? 'Admin'
                            : 'Digital Artist'}
                    </h1>
                </a>
                {location.pathname.includes('dashboard') ? (
                    <></>
                ) : (
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
                )}
            </div>
        </nav>
    );
}
