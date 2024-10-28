import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLocation
} from '@remix-run/react';
import type { LinksFunction, MetaFunction } from '@remix-run/node';
import Navbar from './routes/_user._navbar';

export const meta: MetaFunction = () => {
    return [
        { title: 'Digital Artist Website' },
        {
            name: 'description',
            content: 'This is a wonderful website for a digital artist'
        }
    ];
};

export const links: LinksFunction = () => [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous'
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
    },
    {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
    }
];

export function Layout({ children }: { children: React.ReactNode }) {
    const location = useLocation();
    console.log('LOCATION : ', location);
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                {location.pathname != '/login' && <Navbar />}

                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                crossOrigin="anonymous"
            ></script>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
