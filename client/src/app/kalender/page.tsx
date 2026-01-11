'use client'

import React from 'react';
import KalenderPage from "./kalender";
import Navbar from '@/app/Component/navbar';
import { Footer } from '../Component/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchWithToken } from '@/lib/fetchWithToken';

export default function Home() {
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <KalenderPage />
      </main>
      <Footer />
    </div>
  );
}
