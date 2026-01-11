'use client';

import { useRef } from 'react';
import ReactPlayer from 'react-player';
import { Button } from '@/app/Component/button';
import { Card, CardContent } from '@/app/Component/card';
import { Footer } from '@/app/Component/Footer';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchWithToken } from '@/lib/fetchWithToken';
import { motion } from 'framer-motion';
import { fadeIn } from '@/app/variant';

export const CoursePage = (): JSX.Element => {
  const { id } = useParams();
  
  const [courseTitle, setCourseTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(0);
  const [LastExam, setLastExam] = useState<number | string>(0);
  const [Highest, setHighest] = useState<number | string>(0);

  useEffect(() => {
    async function fetchUserAndScores() {
      try {
        const userRes = await fetchWithToken('/users/me');
        const userData = await userRes.json();
        const userId = userData.id;
        setUserId(userId);

        // Fetch Last Exam
        const lastExamRes = await fetchWithToken(`/quiz/score/latest?userId=${userId}&quizId=${id}`);
        const lastExamData = await lastExamRes.json();
        if (lastExamData.message === "Submission not found.") {
          setLastExam('-');
        } else {
          setLastExam(Number(lastExamData.score) * 10);
        }

        // Fetch Highest Score
        const highestRes = await fetchWithToken(`/quiz/score/highest?userId=${userId}&quizId=${id}`);
        const highestData = await highestRes.json();
        if (highestData.message === "Submission not found.") {
          setHighest('-');
        } else {
          setHighest(Number(highestData.score) * 10);
        }

      } catch (error) {
        console.error("Failed to fetch user or scores:", error);
        setLastExam(0);
        setHighest(0);
      }
    }

    fetchUserAndScores();
  },[]);

  useEffect(() => {
    setLoading(true);
    fetchWithToken(`/materials/${(Number(id) * 8) - 7}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCourseTitle(data.course.title);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    }, []);

    useEffect(() => {
      document.title = courseTitle;
      const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
      
      if (favicon) {
        favicon.href = '/footer.png';
      } else {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = '/footer.png';
        document.head.appendChild(link);
      }
    }, [courseTitle]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/loading.gif" alt="Loading..." className="w-48 h-48 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Background Gradient */}
      <div
        className='fixed inset-0 -z-10'
        style={{
          background:
            'linear-gradient(140.63deg, #FFFFFF 0%, #AABFD3 72.78%, #337BBF 96.96%)',
        }}
      />

      <div className='min-h-screen bg-[#ffffff33]'>
        <main className='container mx-auto px-4 sm:px-6 lg:px-10 py-24 sm:pt-12 md:pt-24 lg:pt-32'>
          <div className='max-w-5xl mx-auto space-y-10 sm:space-y-12'>
            <motion.div 
              variants={fadeIn('right', 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: false, amount: 0.7}}
              className="text-sm sm:text-base font-medium space-x-1"
            >
              <a href={`/Educational/Courses/${id}`}>
                <span className="text-[#337bbf] hover:underline">{courseTitle}</span>
              </a>
              <span className="text-black">&gt;</span>
              <a href={`/Educational/Courses/${id}`}>
                <span className="text-[#337bbf] hover:underline">Week 4</span>
              </a>
              <span className="text-black">&gt;</span>
              <a href={`/Educational/Exam/${id}`}>
                <span className="text-[#337bbf] hover:underline">Ujian</span>
              </a>
            </motion.div>

            {/* Course Title */}
            <header className='space-y-2'>
              <motion.h1 
                variants={fadeIn('left', 0.1)}
                initial='hidden'
                whileInView={'show'}
                viewport={{once: false, amount: 0.7}}
                className='text-3xl sm:text-4xl lg:text-5xl font-outfit tracking-tight'
              >
                <span className='font-bold text-[#334fb4]'>{courseTitle} : </span>
                <span className='text-[#65b4ff] ml-2 font-semibold'>
                  Ujian
                </span>
              </motion.h1>
            </header>

            {/* Assignment Details Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-r from-[#337BBF] to-[#3B5E80] text-white"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 p-8 md:p-12">

                {/* Left Section */}
                <div className="space-y-6 md:w-2/3">
                  <div className="flex items-center gap-4">
                    <img src="/paper.png" alt="Assignment Icon" className="w-10 h-10" />
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                      <span className="text-[#fcd34d]">Detail</span> Pekerjaan
                    </h1>
                  </div>

                  <div className="space-y-4 text-white/90">
                    <div>
                      <h2 className="text-xl font-semibold text-[#fcd34d]">Kursus</h2>
                      <p className="pl-4 text-base">{courseTitle}</p>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[#fcd34d]">Percobaan yang dapat kamu ambil</h2>
                      <p className="pl-4 text-base">Tak Terhingga</p>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-[#fcd34d]">Status</h2>
                      <p className="pl-4 text-base">
                        {typeof Highest !== 'number' || isNaN(Highest) ? (
                          <>
                            Anda <span className="text-red-600 font-semibold">BELUM</span> pernah mengambil ujian
                          </>
                        ) : (
                          <>
                            Graded •{' '}
                            <b className={Highest >= 80 ? 'text-green-500' : 'text-red-600'}>
                              {Highest >= 80 ? 'Pass' : 'Failed'}
                            </b>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="md:w-1/3 flex flex-col items-center md:items-end text-center md:text-right gap-6 mt-8 md:mt-0">
                  <div className="space-y-1">
                    <p className="text-5xl font-bold">
                      <span className="text-[#fcd34d]">{LastExam}</span>/100
                    </p>
                    <p className="text-sm text-white/80">
                      Nilai <span className="text-[#fcd34d]">Anda</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-5xl font-bold">
                      <span className="text-[#fcd34d]">{Highest}</span>/100
                    </p>
                    <p className="text-sm text-white/80">
                      Nilai <span className="text-[#fcd34d]">Tertinggi Anda</span>
                    </p>
                  </div>
                  <Button 
                    className="flex items-center justify-center gap-2 bg-white text-[#337BBF] font-semibold px-5 py-2 rounded-md hover:bg-gray-100 transition"
                    onClick={() => window.location.href = `/Educational/Quiz/${id}`}
                  >
                    <img src="/exam.png" alt="Exam Icon" className="w-5 h-5" />
                    Ambil Ujian
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Tips Section */}
            <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="mt-10 bg-white/70 rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
              {/* Image Section */}
              <div className="md:w-1/5 flex items-center justify-center p-6">
                <img src="/computer.png" alt="Computer Icon" className="w-full max-w-[120px] md:max-w-[160px]" />
              </div>
              
              {/* Tips Content */}
              <div className="md:w-4/5 p-8 space-y-6">
                <h1 className="text-3xl md:text-4xl font-bold text-[#337BBF]">Tips sebelum mengambil ujian :)</h1>
                <p className="text-gray-700 text-base leading-relaxed space-y-2">
                  <span className="block">1. Baca petunjuk dengan saksama agar Anda benar-benar memahami apa yang diminta sebelum mulai menjawab.</span>
                  <span className="block">2. Kelola waktu Anda dengan bijak dengan membaginya antar bagian dan lanjutkan jika sebuah pertanyaan memakan waktu terlalu lama.</span>
                  <span className="block">3. Mulailah dengan pertanyaan yang lebih mudah untuk membangun momentum dan meningkatkan kepercayaan diri.</span>
                  <span className="block">4. Perhatikan waktu agar tetap sesuai jadwal tanpa membiarkan tekanan waktu membuat Anda kewalahan.</span>
                  <span className="block">5. Tinjau kembali jawaban Anda jika waktu memungkinkan untuk menangkap kesalahan atau pertanyaan yang terlewat.</span>
                  <span className="block">6. Tetap tenang dan tarik napas dalam-dalam setiap kali Anda merasa cemas untuk menjaga fokus dan kejernihan.</span>
                </p>
              </div>

            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CoursePage;