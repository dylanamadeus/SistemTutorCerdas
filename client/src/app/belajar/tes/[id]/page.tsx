'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import QuizPage from '../Quiz';
import { fetchWithToken } from '@/lib/fetchWithToken';

interface Material {
  material_id: number;
  course_id: number;
  week: number;
  materials_title: string;
  materials_desc: string;
  materials_video: string;
  materials_duration: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

export default function Home() {
  const { id } = useParams();
  const router = useRouter();

  const [role, setRole] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [userID, setUserID] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // 1. Fetch role first
  useEffect(() => {
    async function fetchRole() {
      try {
        const res = await fetchWithToken('/users/me');
        const data = await res.json();
        if (data.message === 'Unauthorized: No token provided') {
          setRole('No Role');
        } else {
          setRole(data.role);
          setUserID(data.id);
        }
      } catch (error) {
        console.error('Error fetching role:', error);
        setRole('No Role');
      }
    }

    fetchRole();
  }, []);

  // 2. If role is valid, fetch course completion status
  useEffect(() => {
    async function fetchStatus() {
      try {
        const statRes = await fetchWithToken(`/materials/course/${id}`);
        const statData = await statRes.json();
        const allCompleted = statData.every((material: Material) =>
          Array.isArray(material.status) && material.status.includes(userID)
        );
        setStatus(allCompleted ? 1 : 0);
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    }

    if (role && role !== 'No Role') {
      fetchStatus();
    }
  }, [role, id]);

  // 3. Redirect if no role
  useEffect(() => {
    if (role === 'No Role') {
      router.push('/masuk');
    }
  }, [role, router]);

  // 4. Show modal if not completed
  useEffect(() => {
    if (status === 0) {
      setShowModal(true);
    }
  }, [status]);

  // Loading state until both role and status are known
  if (role === null || status === null) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // Block quiz if status = 0 (not completed)
  if (status === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-black bg-opacity-50 px-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 text-center animate-fade-in">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Selesaikan semua video kursus terlebih dahulu!
          </h2>
          <p className="text-gray-600 mb-6">
            Kamu harus menyelesaikan semua materi video sebelum mengambil ujian.
          </p>
          <button
            onClick={() => router.push(`/Educational/Courses/${id}`)}
            className="bg-[#337bbf] text-white px-6 py-2 rounded hover:bg-yellow-500 transition"
          >
            Kembali ke Kursus
          </button>
        </div>
      </div>
    );
  }

  // Quiz can be shown
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <QuizPage />
      </main>
    </div>
  );
}
