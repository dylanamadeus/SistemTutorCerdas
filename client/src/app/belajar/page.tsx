'use client'
import React, { useState, useEffect } from 'react';
import Landing from './Landing';
import Navbar from '../Component/navbar';
import { Footer } from '../Component/Footer';
import { fetchWithToken } from '@/lib/fetchWithToken';
import { useRouter } from 'next/navigation';

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
      <main>
        <Landing />
      </main>
    </div>
  );
}
