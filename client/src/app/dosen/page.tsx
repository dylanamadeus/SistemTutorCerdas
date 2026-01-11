// pages/index.tsx
'use client'
import React, { useEffect, useState } from 'react';
import Hero from './Hero';
import Information from './information';
import App from './manage';
import Course from '@/app/dosen/course';
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
    if (role && role !== 'teacher') {
      router.push('/');
    }
  }, [role, router]);

  // Render nothing while checking role
  if (!role) return null;
  if (role !== 'teacher') return null;

  return (
    <div className='flex flex-col min-h-screen' style={{
          background:
            'linear-gradient(140.63deg, #FFFFFF 0%, #FFF9F1 66%, #FEF3E2 100%)',
        }}>
      <main className='flex-grow relative z-10'>
        <Hero />

        <Information />
        <div style=
          {{
            background:
              'linear-gradient(140.63deg, #FFFFFF 0%, #FFF9F1 66%, #FEF3E2 100%)',
          }}>
          
          <App />
          <section id="course" className='scroll-mt-[4rem]'>
            <Course />
          </section>
        </div>
      </main>
      
    </div>
  );
}
