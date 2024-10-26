import type { MetaFunction } from '@remix-run/node';

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
            <h1>Iustin</h1>
        </div>
    );
}
