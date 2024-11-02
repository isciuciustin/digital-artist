import { createCookie } from '@remix-run/node';

export const accessToken = createCookie('access_token', {
    maxAge: 604_800
});

export const refreshToken = createCookie('refresh_token', {
    maxAge: 604_800
});
