import { createCookie } from '@remix-run/node';

export const accessToken = createCookie('access_token', {
    maxAge: 604_800,
    secrets: [process.env.SECRET_COOKIE_VALUE?.toString() || '']
});

export const refreshToken = createCookie('refresh_token', {
    maxAge: 604_800
});

export const userInfo = createCookie('user_info', {
    maxAge: 604_800
});
