'use client';
// /frontend/pages/test-api.js
import { useEffect, useState } from 'react';

export default function TestAPI() {
  const [message, setMessage] = useState('loading...');

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => res.json())
      .then(json => setMessage(json.message))
      .catch(err => console.error('Error fetching message:', err));
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
