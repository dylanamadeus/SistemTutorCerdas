"use client";

import App from "./App";
import { ChatProvider } from "./hooks/useChat";
import Navbar from '../Component/navbar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchWithToken } from '@/lib/fetchWithToken'; 

export default function TutorPage() {
  const [role, setRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchRole() {
      const res = await fetchWithToken('/users/me');
      const data = await res.json();
      if (data.message === 'Unauthorized: No token provided') {
        setRole('No Role');
      } else {
        setRole(data.role);
      }
    }
    fetchRole();
  }, []);

  useEffect(() => {
    if (role === 'No Role') {
      router.push('/masuk');
    }
  }, [role, router]);

  // Render nothing until role is known
  if (!role || role === 'No Role') return null;

  return (
    
    <ChatProvider>
      <Navbar />
      <App />
    </ChatProvider>
  );
}
