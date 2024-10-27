import type { MetaFunction } from '@remix-run/node';
import Navbar from './_user._navbar';
import { Outlet } from '@remix-run/react';

export const meta: MetaFunction = () => {
    return [
        { title: 'Digital Artist Website' },
        {
            name: 'description',
            content: 'This is a wonderful website for a digital artist'
        }
    ];
};

export default function Index() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}
