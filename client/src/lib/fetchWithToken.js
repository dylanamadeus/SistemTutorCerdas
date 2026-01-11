import Cookie from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function fetchWithToken(path, options = {}) {
    const token = Cookie.get('token');

    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            ...(options.headers || {}),
            'Authorization': token,
        },
    });

    return response;
}