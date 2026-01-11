'use client';

import { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Button } from '@/app/Component/button';
import { Card, CardContent } from '@/app/Component/card';
import { Footer } from '@/app/Component/Footer';
import { fetchWithToken } from '@/lib/fetchWithToken';
import { motion } from 'framer-motion';
import { fadeIn } from '@/app/variant';
import { useParams } from 'next/navigation';

export const CoursePage = (): JSX.Element => {
  useEffect(() => {
    document.title = 'Learning Material';
    const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    
    if (favicon) {
      favicon.href = '/footer.png';
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = '/footer.png';
      document.head.appendChild(link);
    }
  }, []);

  const { id } = useParams();

  const [courseID, setCourseID] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [materialTitle, setMaterialTitle] = useState('');
  const [materialDesc, setMaterialDesc] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [materialLink, setMaterialLink] = useState('');
  const [deadline, setDeadline] = useState('');
  const [materialWeek, setMaterialWeek] = useState(0);
  const [loading, setLoading] = useState(true);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    setLoading(true);
    fetchWithToken(`/materials/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMaterialTitle(data.materials_title);
        setMaterialDesc(data.materials_desc);
        setCourseID(data.course.id);
        setCourseTitle(data.course.title);
        setMaterialType(data.materials_type);
        setDeadline(data.deadline);
        setMaterialWeek(data.week);

        // Tentukan link berdasarkan type
        if (data.materials_type === 'Video') setMaterialLink(data.materials_video);
        else if (data.materials_type === 'Dokumen') setMaterialLink(data.materials_doc);
        else if (data.materials_type === 'Link') setMaterialLink(data.materials_link);
        else if (data.materials_type === 'Ujian') setMaterialLink(data.materials_link);
        else if (data.materials_type === 'Tugas') setMaterialLink(data.materials_link);
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 1000);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/loading.gif" alt="Loading..." className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  // === VIDEO HANDLER ===
  const handlePlayPause = () => setPlaying(!playing);
  const handleProgress = (state: { playedSeconds: number }) => setProgress(state.playedSeconds);
  const handleDuration = (d: number) => setDuration(d);
  const skipSeconds = (s: number) => {
    const player = playerRef.current;
    if (player) player.seekTo(player.getCurrentTime() + s);
  };
  const formatTime = (s: number) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${pad(m)}:${pad(r)}`;
  };

  // === RENDER KONTEN BERDASARKAN TIPE ===
  const renderMaterialContent = () => {
    switch (materialType) {
      case 'Video':
        return (
          <Card className='overflow-hidden rounded-xl shadow-lg border-none bg-white/80 backdrop-blur-sm'>
            <CardContent className='p-0'>
              <div className='relative aspect-video'>
                <ReactPlayer
                  ref={playerRef}
                  url={materialLink}
                  width='100%'
                  height='100%'
                  playing={playing}
                  onProgress={handleProgress}
                  onDuration={handleDuration}
                  controls={false}
                  className='absolute top-0 left-0'
                />

                {/* Custom Controls */}
                <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-3 px-4'>
                  <div className='flex items-center gap-4 text-white'>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='text-white hover:text-white/80'
                      onClick={handlePlayPause}
                    >
                      {playing ? '⏸️' : '▶️'}
                    </Button>

                    <span className='text-sm font-medium'>
                      {formatTime(progress)} / {formatTime(duration)}
                    </span>

                    <div className='relative flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden'>
                      <div
                        className='absolute inset-y-0 left-0 bg-blue-500 rounded-full transition-all duration-150'
                        style={{ width: `${(progress / duration) * 100}%` }}
                      />
                    </div>

                    <Button variant='ghost' className='text-white text-sm' onClick={() => skipSeconds(-10)}>
                      -10s
                    </Button>
                    <Button variant='ghost' className='text-white text-sm' onClick={() => skipSeconds(10)}>
                      +10s
                    </Button>
                  </div>
                </div>

                {!playing && (
                  <div
                    className='absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer'
                    onClick={handlePlayPause}
                  >
                    <div className='h-20 w-20 rounded-full bg-white/30 flex items-center justify-center'>
                      <div className='text-4xl text-white'>▶️</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );

      case 'Dokumen':
        const isPDF = materialLink?.toLowerCase().endsWith('.pdf');
        const viewerLink = isPDF
          ? materialLink
          : `https://docs.google.com/gview?url=${window.location.origin}${materialLink}&embedded=true`;

        return (
          <Card className='rounded-xl shadow-lg border-none bg-white/80 backdrop-blur-sm'>
            <CardContent className='p-0'>
              {materialLink ? (
                <iframe
                  src={viewerLink}
                  className='w-full h-[80vh] rounded-xl'
                  title='Document Viewer'
                />
              ) : (
                <div className="w-full h-[80vh] flex items-center justify-center text-gray-500">
                  Tidak ada dokumen yang tersedia
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'Link':
        return (
          <Card className='rounded-xl shadow-lg border-none bg-white/80 backdrop-blur-sm text-center py-20'>
            <h2 className='text-2xl font-semibold text-[#FAB12F] mb-4'>Klik tautan di bawah untuk membuka materi:</h2>
            <a
              href={materialLink}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-600 underline text-lg hover:text-blue-800'
            >
              {materialLink}
            </a>
          </Card>
        );

      default:
        return <p className='text-center text-gray-500'>Tipe materi tidak dikenali.</p>;
    }
  };

  return (
    <>
      <div
        className='fixed top-0 left-0 w-full h-full -z-10'
        style={{
          background:
            'linear-gradient(140.63deg, #FFFFFF 0%, #FFF9F1 66%, #FEF3E2 100%)',
        }}
      />

      <div className='min-h-screen bg-[#ffffff33]'>
        <main className='container mx-auto px-4 sm:px-6 lg:px-10 py-24 sm:pt-12 md:pt-24 lg:pt-32'>
          <div className='max-w-5xl mx-auto space-y-10 sm:space-y-12'>
            <motion.div 
              variants={fadeIn('right', 0.1)}
              initial='hidden'
              whileInView='show'
              className='text-sm sm:text-base font-medium space-x-1'
            >
              <a href={`/belajar/kursus/${courseID}`}>
                <span className='text-[#FAB12F] hover:underline'>{courseTitle}</span>
              </a>
              <span className='text-black'>&gt;</span>
              <span className='text-[#DD0303] hover:underline'>Minggu ke-{materialWeek}</span>
              <span className='text-black'>&gt;</span>
              <span className='text-[#1F1A17] hover:underline'>{materialTitle}</span>
            </motion.div>

            <header className='space-y-2'>
              <motion.h1 
                variants={fadeIn('left', 0.1)}
                initial='hidden'
                whileInView='show'
                className='text-3xl sm:text-4xl lg:text-5xl font-outfit tracking-tight'
              >
              <div className='flex flex-col'>
                <span className='font-bold text-[#FAB12F]'>{courseTitle} :</span>
                <span className='text-[#1F1A17] font-light'>{materialTitle}</span>
              </div>
              </motion.h1>
            </header>

            {/* === MATERIAL CONTENT === */}
            {renderMaterialContent()}

            {/* === DESCRIPTION === */}
            <section className='space-y-6 bg-white/20 backdrop-blur-sm rounded-xl p-6 sm:p-8'>
              <motion.h2 
                variants={fadeIn('left', 0.1)}
                initial='hidden'
                whileInView='show'
                className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FAB12F] font-outfit'
              >
                Deskripsi Materi
              </motion.h2>
              <motion.div 
                variants={fadeIn('right', 0.1)}
                initial='hidden'
                whileInView='show'
                className='prose prose-lg max-w-none'
              >
                <p className='text-base sm:text-lg text-[#1F1A17] font-outfit leading-relaxed'>
                  {materialDesc}
                </p>
              </motion.div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CoursePage;
