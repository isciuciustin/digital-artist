import { redirect } from '@remix-run/node';
import { accessToken, refreshToken, userInfo } from '~/cookies.server';

export default async function Authentication(request: Request, type: string) {
    const cookieHeader = request.headers.get('Cookie');
    const access_token_cookie = (await accessToken.parse(cookieHeader)) || {};
    const refresh_token_cookie = (await refreshToken.parse(cookieHeader)) || {};
    const user_info_token_cookie = (await userInfo.parse(cookieHeader)) || {};

    if (
        typeof access_token_cookie.access_token !== 'string' ||
        typeof refresh_token_cookie.refresh_token !== 'string' ||
        typeof user_info_token_cookie.user_info !== 'string'
    ) {
        throw redirect('/login');
    }

    let verify_access_token = await fetch(
        `http://localhost:3000/auth/verify_token`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + access_token_cookie.access_token
            }
        }
    );
    verify_access_token = await verify_access_token.json();
    if (verify_access_token.isValid == 'TOKEN_IS_VALID') {
        return access_token_cookie.access_token;
    } else {
        let get_tokens = await fetch(`http://localhost:3000/auth/get_tokens`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + refresh_token_cookie.refresh_token
            },
            body: JSON.stringify({
                user_id: Number(user_info_token_cookie.user_info.split('_')[0]),
                username: user_info_token_cookie.user_info.split('_')[1]
            })
        });
        get_tokens = await get_tokens.json();

        if (get_tokens?.message == 'Unauthorized') {
            const headers = new Headers();

            headers.append(
                'Set-Cookie',
                await accessToken.serialize('', { maxAge: -1 })
            );
            headers.append(
                'Set-Cookie',
                await refreshToken.serialize('', { maxAge: -1 })
            );
            headers.append(
                'Set-Cookie',
                await userInfo.serialize('', { maxAge: -1 })
            );

            throw redirect('/login', { headers: headers });
        } else {
            access_token_cookie.access_token = get_tokens.access_token;
            if (type == 'action') return access_token_cookie.access_token;

            refresh_token_cookie.refresh_token = get_tokens.refresh_token;

            const headers = new Headers();

            headers.append(
                'Set-Cookie',
                await accessToken.serialize(access_token_cookie)
            );
            headers.append(
                'Set-Cookie',
                await refreshToken.serialize(refresh_token_cookie)
            );
            console.log('GET TOKENS : ', get_tokens);

            throw redirect(new URL(request.url).pathname, {
                headers: headers
            });
        }
    }
}
