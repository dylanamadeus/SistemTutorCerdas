'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/Component/accordion';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/app/Component/navbar';
import { Footer } from '@/app/Component/Footer';
import { useParams, useSearchParams } from 'next/navigation';
import { fetchWithToken } from "@/lib/fetchWithToken";
import { motion } from 'framer-motion';
import { fadeIn } from '@/app/variant';
// import Link from 'next/link';  // Import Link from Next.js

interface Material {
  material_id: number;
  course_id: number;
  week: number;
  materials_title: string;
  materials_desc: string;
  materials_type: string;
  materials_video: string;
  materials_doc: string;
  materials_link: string;
  materials_duration: number;
  status: number[];
  createdAt: string;
  updatedAt: string;
}

interface WeekContentItem {
  material_id: number;
  title: string;
  type: string;
  duration: string;
  icon: string;
  link?: string;
  status: number;
}

  interface WeekData {
    week: number;
    status: 'completed' | 'in-progress' | 'upcoming';
    videos: string;
    readings: string;
    assessments: string;
    content?: WeekContentItem[];
  }

export const CoursePage = (): JSX.Element => {
  const { id } = useParams();
  const searchParams = useSearchParams();

  const [courseTitle, setCourseTitle] = useState('');
  const [courseDesc, setCourseDesc] = useState('');
  const [duration, setDuration] = useState(0);
  const [weekData, setWeekData] = useState<WeekData[]>([]);
  const [userID, setUserID] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const userRes = await fetchWithToken('/users/me');
        const userData = await userRes.json();
        setUserID(userData.id);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const courseRes = await fetchWithToken(`/courses/${id}`);
        const courseData = await courseRes.json();
        setCourseTitle(courseData.title);
        setCourseDesc(courseData.description);

        const materialRes = await fetchWithToken(`/materials/course/${id}`);
        const materials: Material[] = await materialRes.json();
        const currentUserId = userID;

        const quizRes = await fetchWithToken(`/quiz/${id}`);
        const quizData = await quizRes.json();
        setDuration(quizData.duration);
        
        const grouped: Record<number, WeekData> = {};

        materials.forEach((material) => {
          if (!grouped[material.week]) {
            grouped[material.week] = {
              week: material.week,
              status: 'in-progress',
              videos: '',
              readings: '0 min of Readings left',
              assessments: '0 Assessment left',  
              content: [],
            };
          }

          const isCompleted = material.status.includes(currentUserId);

          let link;
          let icon;

          switch (material.materials_type) {
            case 'Video':
              link = material.materials_video;
              icon = '/video.png';
              break;
            case 'Dokumen':
              link = material.materials_doc;
              icon = '/doc.png';
              break;
            case 'Link':
              link = material.materials_link;
              icon = '/link.png';
              break;
            case 'Ujian':
              link = material.materials_link;
              icon = '/test.png';
              break;
            case 'Tugas':
              link = material.materials_link;
              icon = '/tugas.png';
              break;
            default:
              link = '';
              icon = '';
              break;
          }

          if (isCompleted) {
            icon = '/done.png';
          }

          grouped[material.week].content?.push({
            material_id: material.material_id,
            title: material.materials_title,
            type: material.materials_type,
            duration: `${material.materials_duration} menit`,
            icon,
            link,
            status: isCompleted ? 1 : 0
          });
        });

        Object.values(grouped).forEach((week) => {
          let totalDuration = 0;
          let allCompleted = true;
  
          week.content?.forEach((item) => {
            if (item.status !== 1) {
              const minutes = parseInt(item.duration.replace(' min', ''), 10);
              totalDuration += isNaN(minutes) ? 0 : minutes;
              allCompleted = false;
            }
          });
  
          if (allCompleted || totalDuration === 0) {
            week.videos = 'Semua Pembelajaran Telah Selesai';
            week.status = 'completed';
          } else {
            week.videos = `${totalDuration} Menit Durasi Pembelajaran Tersisa`;
            week.status = 'in-progress';
          }
        });

        // Set hasilnya ke state
        setWeekData(
          Object.values(grouped).sort((a, b) => a.week - b.week)
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (userID === 0) {
      return;
    } else {
      fetchData();
    }

  }, [userID, id]);

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

  return (
    <div className='relative min-h-screen w-full flex flex-col'>
      <div
        className='fixed top-0 left-0 w-full h-full -z-10'
        style={{
          background:
            'linear-gradient(140.63deg, #FFFFFF 0%, #FFF9F1 66%, #FEF3E2 100%)',
        }}
      />

      <Navbar />

      <main className='flex-grow'>
        <div className='max-w-[1440px] mx-auto px-14 md:px-20 lg:px-20 py-20 md:py-20 lg:py-32'>

          {/* Course Title and Description */}
          <section className='mb-6 md:mb-8 lg:mb-10'>
            <motion.h1 
            variants={fadeIn('left', 0.1)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once: false, amount: 0.7}}
            className='font-bold text-5xl sm:text-4xl md:text-4xl lg:text-5xl text-[#FAB12F] mb-4 md:mb-6'>
              {courseTitle}
            </motion.h1>
            <motion.div 
            variants={fadeIn('down', 0.1)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once: false, amount: 0.01}}
            className='text-lg sm:text-base md:text-lg space-y-3 md:space-y-4 lg:space-y-6'>
              <p className='leading-relaxed'>
                {courseDesc}
              </p>
            </motion.div>
          </section>

          {/* Course Content */}
          <motion.section
          variants={fadeIn('up', 0.1)}
          initial='hidden'
          whileInView={'show'}
          viewport={{once: false, amount: 0.7}}
          >
            <Card className='border border-[#FAB12F] rounded-[10px] overflow-hidden'>
              <CardContent className='p-0'>
                <Accordion type='single' collapsible className='w-full'>
                  {weekData.map((week, index) => (
                    <AccordionItem
                      key={index}
                      value={`week-${week.week}`}
                      className='border-b border-[#FAB12F] last:border-b-0'
                    >
                      <AccordionTrigger className='px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 hover:no-underline'>
                        <div className='flex flex-col items-start w-full'>
                          <h3 className='font-bold text-lg sm:text-xl md:text-2xl text-[#DD0303]'>
                            Minggu ke-{week.week}
                          </h3>
                          <div className='flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mt-2 text-[10px] sm:text-xs font-medium text-[#1F1A17]'>
                            <div className='flex items-center'>
                              <img
                                className='w-4 h-4 sm:w-5 sm:h-5 mr-1'
                                alt='Learn icon'
                                src='/learn.png'
                              />
                              <span>{week.videos}</span>
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className='px-3 sm:px-4 md:px-6 pb-4 sm:pb-5 md:pb-6'>
                        {week.content && (
                          <div className='space-y-3 sm:space-y-4 mt-2'>
                            {( week.content
                            ).map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className='flex items-start gap-2 sm:gap-3 md:gap-4'
                              >
                                {item.link ? (
                                  <button onClick={() => {
                                    if (item.material_id === 0) {
                                      // router.push(`/belajar/Exam/${id}`);
                                      router.push(`/belajar`);
                                    } else if (item.type === 'Ujian') {
                                      router.push(`/belajar/ujian/${item.link}`);
                                    } else if (item.type === 'Tugas') {
                                      router.push(`/belajar/tugas/${item.link}`);
                                    } else {
                                      router.push(`/belajar/materi/${item.material_id}`);
                                    }
                                  }}
                                >
                                    <img
                                      className='w-5 h-5 sm:w-6 sm:h-6 md:w-[30px] md:h-[30px] object-cover'
                                      alt={`${item.type} icon`}
                                      src={item.icon}
                                    />
                                  </button>
                                ) : (
                                  <img
                                    className='w-5 h-5 sm:w-6 sm:h-6 md:w-[30px] md:h-[30px] object-cover'
                                    alt={`${item.type} icon`}
                                    src={item.icon}
                                  />
                                )}

                                <div>
                                  <h4 className='font-bold text-xs sm:text-sm text-[#FAB12F]'>
                                    {item.title}
                                  </h4>
                                  <p className='font-normal text-[10px] sm:text-xs text-[#1F1A17]'>
                                    {item.duration === 'null menit'
                                      ? item.type
                                      : `${item.type}  •  ${item.duration}`
                                    }
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoursePage;
