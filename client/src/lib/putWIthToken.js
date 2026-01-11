import Cookie from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function putWithToken(path, data, options = {}) {
  const token = Cookie.get('token'); // Get token from cookies

  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`, // Attach the token as Authorization header
      ...(options.headers || {}),
    },
    body: JSON.stringify(data), // Send the data (newStatus) as JSON in the request body
    ...options,
  });

  return response;
}
