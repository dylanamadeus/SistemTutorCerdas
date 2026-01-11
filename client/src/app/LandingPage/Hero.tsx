'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '../Component/card';
import { Button } from '@/components/ui/button';
import FallingLeaves from "../Component/falling-leaves"
import { Footer } from '../Component/Footer';
import { fetchWithToken } from '@/lib/fetchWithToken';
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fadeIn } from '@/app/variant'

const Index = (): JSX.Element => {
  const images = [
    "/GambarLanding/slide1.jpg",
    "/GambarLanding/slide2.jpg",
    "/GambarLanding/slide3.jpg",
    "/GambarLanding/slide4.jpg",
    "/GambarLanding/slide5.jpg",
  ];
  const [continueCourseLink, setContinueCourseLink] = useState<string>('');
  const [role, setRole] = useState('');
  const [userID, setUserID] = useState(0);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Variants animasi fade + slide
  const variants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };


  useEffect(() => {
    document.title = 'Safeena Academy';
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


  useEffect(() => {
    async function fetchRole() {
      try {
        const roleRes = await fetchWithToken('/users/me')
        const roleData = await roleRes.json();
        if(roleData.message === "Unauthorized: No token provided") {
          setRole('No Role');
        } else {
          setRole(roleData.role);
        }
        setUserID(roleData.id);
      } catch (error) {
        console.error("Error role", error);
      }
    }
    fetchRole();
  }, []);


  // useEffect(() => {
  //   async function fetchContinueCourse() {
  //     try {
  //       const res = await fetchWithToken('/materials');
  //       const data = await res.json();

  //       // Filter yang status === 1 (sudah selesai)
  //       const completedMaterials = data.filter((material: any) =>
  //         Array.isArray(material.status) && material.status.includes(userID)
  //       );

  //       if (completedMaterials.length > 0) {
  //         completedMaterials.sort(
  //           (a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  //         );

  //         const lastCompletedMaterial = completedMaterials[0];
  //         let nextMaterialId = lastCompletedMaterial.material_id + 1;

  //         // Cek batas material_id
  //         const allMaterialIds = data.map((m: any) => m.material_id);
  //         const maxMaterialId = Math.max(...allMaterialIds);

  //         if (nextMaterialId > maxMaterialId ) {
  //           setContinueCourseLink('/belajar');
  //         } else {
  //           setContinueCourseLink(`/belajar/materi/${nextMaterialId}`);
  //         }
  //       } else {
  //         setContinueCourseLink('/belajar');
  //       }
  //     } catch (error) {
  //       console.error('Failed fetching materials', error);
  //     }
  //   }

  //   if (role === 'student' || role === 'admin' || role === 'teacher') {
  //     fetchContinueCourse();
  //   } else {
  //     setContinueCourseLink('/Login')
  //   }
  // }, [role]);

  useEffect(() => {
    document.title = 'Beranda';
    const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    
    if (favicon) {
      favicon.href = '/Logo.png';
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = '/Logo.png';
      document.head.appendChild(link);
    }
  }, []);

  // Service cards data
  const serviceCards = [
  {
    title: 'Warta Unpad',
    image: '/WartaUnpad.png',
  },
  {
    title: 'Kursus Pembelajaran',
    image: '/KursusPembelajaran.png',
  },
  {
    title: 'Agenda Perkuliahan',
    image: '/Kalender.png',
  },
  {
    title: 'Tutor Cerdas',
    image: '/TutorCerdas.png',
  },
];

  return (
    <div
    className='flex flex-row justify-center w-full'
      style={{
        position: 'absolute',
        top: '0px',
        background:
        'linear-gradient(140.63deg, #FFFFFF 0%, #FFF9F1 66%, #FEF3E2 100%)',
      }}
      >
      <div className='overflow-hidden w-full relative'>
        {/* Hero Section */}
        <section className='w-full max-w-[1070px] mt-[100px] md:mt-[223px] mx-auto text-center px-4'>
          <motion.h1 
          variants={fadeIn('right', 0.1)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once: false, amount: 0.65}}
          className='font-bold text-4xl md:text-[64px] leading-[normal]'>
            <span className='text-[#FAB12F]'>Belajar </span>
            <span className='text-[#DD0303]'>Lebih Mudah</span>
            <span className='text-black'> </span>
            <span className='text-[#FA812F]'>Dimana Saja dan Kapan Saja</span>
          </motion.h1>
          <motion.p 
          variants={fadeIn('left', 0.1)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once: false, amount: 0.65}}
          className='font-medium text-base md:text-lg text-[#1F1A17] max-w-[585px] mx-auto mt-[20px]'>
            Platform pembelajaran terintegrasi yang memudahkan mahasiswa dan dosen untuk mengakses materi, mengerjakan tugas, serta berinteraksi tanpa batas ruang dan waktu.
          </motion.p>
          <motion.div 
          variants={fadeIn('up', 0.1)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once: false, amount: 0.65}}
          className='flex flex-col sm:flex-row justify-center gap-4 mt-[40px]'>
            <Button className='w-full sm:w-[255px] h-[58px] rounded-[30px] bg-gradient-to-r from-[#FAB12F] to-[#FA812F] hover:from-[#FA812F] hover:to-[#F9542F] transition-all duration-300'>
              <a href="#fitur" className='w-full h-full flex items-center justify-center'>
                <span className='font-medium text-xl text-white'>
                  Belajar Sekarang
                </span>
              </a>
            </Button>


            <Button
              variant='outline'
              className='w-full sm:w-[255px] h-[58px] rounded-[30px] border border-[#FAB12F] bg-transparent'
            >
              <a href="#lms" className='w-full h-full flex items-center justify-center'>
                <span className='font-medium text-xl bg-gradient-to-r from-[#FAB12F] to-[#FA812F] bg-clip-text text-transparent hover:from-[#FA812F] hover:to-[#F9542F] transition-all duration-300'>
                  Tentang LMS
                </span>
                <img
                  className='w-[25px] h-[25px] ml-2 object-cover'
                  alt='Arrow'
                  src='/ArrowTentang.png'
                />
              </a>
            </Button>
          </motion.div>
        </section>

        {/* Banner Image */}
        <motion.div
          variants={fadeIn('up', 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.65 }}
          className="relative w-full max-w-[1066px] h-[200px] md:h-[500px] mt-[5rem] mx-auto px-4 overflow-hidden rounded-[25px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute w-full h-full bg-cover bg-center rounded-[25px]"
              style={{ backgroundImage: `url(${images[index]})` }}
            />
          </AnimatePresence>

          {/* Tombol kiri-kanan */}
          <button
            onClick={() => setIndex((index - 1 + images.length) % images.length)}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white transition"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setIndex((index + 1) % images.length)}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full text-white transition"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicator bulat */}
          <div className="absolute bottom-4 w-full flex justify-center gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                  i === index ? "bg-white" : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* fitur" */}
        <section id="fitur" className='mt-[80px] relative scroll-mt-[-7rem]'>
          <img className='w-full' alt='Vector' src='/vector.svg' />
          <div className='w-full [background-image:url(/cardbg.svg)] bg-no-repeat bg-cover py-[60px] md:py-[104px]'>
            <div className='max-w-[1070px] mx-auto px-4'>
              <motion.div 
              variants={fadeIn('left', 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: false, amount: 0.9}}
              className='text-center mb-[40px] md:mb-[60px]'>
                <h2 className='text-3xl md:text-5xl font-normal mb-4'>
                  <span className='font-light text-[#FAB12F]'>Layanan </span>
                  <span className='font-light text-[#ffffff]'> </span>
                  <span className='font-medium text-[#FAB12F]'>Pembelajaran</span>
                </h2>
                <p className='font-extralight text-base md:text-lg text-[#000000]'>
                  Akses materi, atur jadwal, hingga bimbingan pintar tersedia untuk mendukung pembelajaranmu.
                </p>
              </motion.div>

              <motion.div
                variants={fadeIn('down', 0.1)}
                initial='hidden'
                whileInView='show'
                viewport={{ once: false, amount: 0.65 }}
                className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 lg:px-0'
              >
                {serviceCards.map((card, index) => {
                  let link = '/Login'; // Default
                  
                  if (card.title === 'Warta Unpad') link = 'https://www.instagram.com/universitaspadjadjaran/';
                  if (card.title === 'Kursus Pembelajaran') link = '/belajar';
                  if (card.title === 'Agenda Perkuliahan') link = '/kalender';
                  if (card.title === 'Tutor Cerdas') link = '/tutor';

                  return (
                    <div
                      key={index}
                      className={`flex justify-center
                        ${index === 0 || index === 2 ? 'lg:mb-16 pb-0 lg:-translate-y-4' : ''}
                        ${index === 1 || index === 3 ? 'lg:mt-16 pt-0 lg:translate-y-4' : ''}
                      `}
                    >
                      <a
                        href={link}
                        className="
                          group
                          w-full max-w-[280px] block rounded-[10px] 
                          border-[3px] sm:border-[4px] lg:border-[6px] border-solid 
                          shadow-[4px_4px_4px_#00000040] sm:shadow-[7px_6px_4px_#00000040] 
                          transition-all duration-300
                          bg-[#f6f6f6] border-[#FAB12F] 
                          hover:bg-[#FAB12F] hover:border-[#f6f6f6] 
                          transform hover:scale-105
                        "
                      >
                        <Card
                          className="
                            w-full max-w-[280px] rounded-[10px] 
                            border-[3px] sm:border-[4px] lg:border-[6px] border-solid 
                            shadow-[4px_4px_4px_#00000040] sm:shadow-[7px_6px_4px_#00000040] 
                            transition-all duration-300
                            bg-transparent border-transparent
                            flex flex-col items-center justify-center
                            p-4 sm:p-6 h-[220px] sm:h-[260px] lg:h-[280px]
                          "
                        >
                          <img
                            className="w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] lg:w-[180px] lg:h-[180px] object-contain mb-4"
                            alt={card.title}
                            src={card.image}
                          />
                          <h3
                            className="
                              font-normal text-lg sm:text-xl lg:text-xl text-center
                              text-[#FAB12F] group-hover:text-[#f6f6f6] transition-colors duration-300
                            "
                          >
                            {card.title}
                          </h3>
                        </Card>
                      </a>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
          <img className='w-full' alt='Vector' src='/vector-1.svg' />
        </section>

        {/* Live */}
        <section id="lms" className="w-full max-w-[1066px] mx-auto mt-[80px] flex flex-col gap-10 px-4 scroll-mt-[10rem]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border border-[#FAB12F] rounded-[12px] p-4 md:p-6 bg-white/60 h-auto md:h-[300px]">
            <motion.div
              variants={fadeIn('left', 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.65 }}
              className="w-full md:w-1/2"
            >
              <img
                src="/Live/live1.jpg"
                alt="Tentang LiVE"
                className="w-[300px] h-[200px] md:w-[450px] md:h-[250px] rounded-lg object-cover mx-auto"
              />
            </motion.div>

            <motion.div
              variants={fadeIn('right', 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.65 }}
              className="w-full md:w-1/2 text-justify"
            >
              <h3 className="font-semibold text-lg mb-2">
                Tentang LiVE Learning Management System (LMS)
              </h3>
              <p className="text-[#201916]/80 leading-relaxed">
                LiVE (Learning in Virtual Environment) merupakan Learning Management
                System (LMS), platform pembelajaran resmi di Universitas Padjadjaran
                untuk seluruh Program Studi yang menyelenggarakan Pendidikan Bergelar
                dan Non-Gelar.
              </p>
            </motion.div>
          </div>

          {/* 2️⃣ Melalui LiVE LMS */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 border border-[#FAB12F] rounded-[12px] p-4 md:p-6 bg-white/60 h-auto md:h-[300px]">
            <motion.div
              variants={fadeIn('right', 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.65 }}
              className="w-full md:w-1/2 text-justify"
            >
              <h3 className="font-semibold text-lg mb-2">
                Melalui LiVE LMS,
              </h3>
              <p className="text-[#201916]/80 leading-relaxed">
                para pengguna dapat mengikuti berbagai aktivitas belajar daring yang
                dirancang khusus dan interaktif untuk membantu mencapai capaian
                pembelajaran secara efektif. LiVE dapat membantu dosen dalam
                mengelola materi dan pembelajaran di platform daring, seperti
                memberikan tugas, membuat kuis dan pelaksanaan ujian serta presensi.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn('left', 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.65 }}
              className="w-full md:w-1/2"
            >
              <img
                src="/Live/live2.jpg"
                alt="Melalui LiVE LMS"
                className="w-[300px] h-[200px] md:w-[450px] md:h-[250px] rounded-lg object-cover mx-auto"
              />
            </motion.div>
          </div>

          {/* 3️⃣ Fasilitasi Mahasiswa */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border border-[#FAB12F] rounded-[12px] p-4 md:p-6 bg-white/60 h-auto md:h-[300px]">
            <motion.div
              variants={fadeIn('left', 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.65 }}
              className="w-full md:w-1/2"
            >
              <img
                src="/Live/live3.jpg"
                alt="Mahasiswa LiVE LMS"
                className="w-[300px] h-[200px] md:w-[450px] md:h-[250px] rounded-lg object-cover mx-auto"
              />
            </motion.div>

            <motion.div
              variants={fadeIn('right', 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.65 }}
              className="w-full md:w-1/2 text-justify"
            >
              <h3 className="font-semibold text-lg mb-2">
                Selain itu, <span className="text-[#FA812F]">LiVE memfasilitasi mahasiswa</span>
              </h3>
              <p className="text-[#201916]/80 leading-relaxed">
                untuk dapat mengakses materi pembelajaran, mengumpulkan tugas,
                menjawab kuis, serta berpartisipasi dalam diskusi.
              </p>
            </motion.div>
          </div>

        </section>

        <div className='mt-40'> </div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
