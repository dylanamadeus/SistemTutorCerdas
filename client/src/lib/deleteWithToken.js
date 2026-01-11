import Cookie from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function deleteWithToken(path, data = null, options = {}) {
  const token = Cookie.get('token'); // Get token from cookies

  const fetchOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      ...(options.headers || {}),
    },
    ...options,
  };

  if (data !== null) {
    fetchOptions.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${path}`, fetchOptions);
  return response;
}
