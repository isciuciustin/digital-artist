import { redirect } from '@remix-run/node';
import { accessToken, refreshToken } from '~/cookies.server';

export default async function Authentication(request: Request) {
    const cookieHeader = request.headers.get('Cookie');
    const access_token_cookie = (await accessToken.parse(cookieHeader)) || {};
    const refresh_token_cookie = (await refreshToken.parse(cookieHeader)) || {};

    if (
        typeof access_token_cookie.access_token !== 'string' ||
        typeof refresh_token_cookie.refresh_token !== 'string'
    )
        throw redirect('/login');

    console.log('ACCESS TOKEN : ', cookie.access_token);
    console.log('Authentication');
    return 'SUCCESS';
}
