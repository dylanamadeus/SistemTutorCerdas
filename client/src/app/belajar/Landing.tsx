import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Footer } from '../Component/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn } from '../variant';
import { fetchWithToken } from '@/lib/fetchWithToken';

interface Course {
  id: number;
  title: string;
  description: string;
  course_img: string | null;
  highlighted: boolean;
}

export const Landing = (): JSX.Element => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Kursus Pembelajaran';
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

  

  useEffect(() => {
    async function fetchCourses() {
      try {
        const courseRes = await fetchWithToken("/courses");
        if (courseRes.ok) {
          const data: Course[] = await courseRes.json();
          setCourses(data);
        } else {
          console.error("Failed to fetch courses:", courseRes.statusText);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/loading.gif" alt="Loading..." className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  const benefits = [
    {
      id: 1,
      icon: '/benefit1.png',
      text: (
        <>
          Mengasah <span className='font-semibold'>Kreativitas & Berpikir Kritis</span>
        </>
      ),
    },
    {
      id: 2,
      icon: "/benefit2.png",
      text: (
        <>
          <span className='font-semibold'>Adaptif</span> Dengan Dunia
        </>
      ),
    },
    {
      id: 3,
      icon: "/benefit3.png",
      text: (
        <>
          Buka banyak <span className='font-semibold'>kesempatan</span>
        </>
      ),
    },
    {
      id: 4,
      icon: "/benefit4.png",
      text: (
        <>
          <span className='font-semibold'>Investasi</span> masa depan
        </>
      ),
    },
    {
      id: 5,
      icon: "/benefit5.png",
      text: (
        <>
          Mempersiapkan <span className='font-semibold'>Karier Impian</span>
        </>
      ),
    }
  ];


  return (
    <div className='relative min-h-screen overflow-hidden'>
      <div
        className='fixed top-0 left-0 w-full h-full -z-10'
        style={{
          background:
            'linear-gradient(140.63deg, #FFFFFF 0%, #FFF9F1 66%, #FEF3E2 100%)',
        }}
      />

      <div className='flex flex-col min-h-screen'>
        <main className='relative flex-grow'>
          {/* Benefits Section */}
          <section className='flex flex-col lg:flex-row justify-between pt-28 md:mt-24 sm:mt-4 px-4 md:px-[60px] lg:px-[200px] w-full max-w-[1440px] mx-auto mb-[50px] md:mb-[-50px] gap-2 lg:gap-0'>
            <div className='max-w-full lg:max-w-[566px]'>
              <motion.h1 
              variants={fadeIn('right', 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: false, amount: 0.7}}
              className='font-bold text-3xl md:text-4xl lg:text-5xl mb-[30px] md:mb-[53px] text-center lg:text-left animate-fade-in'>
                <span className='text-[#FAB12F]'>Kenapa Kita Harus </span>
                <span className='text-[#DD0303]'>Terus Belajar </span>
                <span className='text-[#FAB12F]'>Sii?</span>
              </motion.h1>
              <motion.div 
              variants={fadeIn('down', 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: false, amount: 0.7}}
              className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-[39px] md:gap-y-[25px]'>
                {benefits.map((benefit) => (
                  <div
                    key={benefit.id}
                    className='flex items-center p-4 rounded-lg transition-all duration-300 hover:bg-white/50 hover:shadow-lg'
                  >
                    <img
                      className='w-8 h-8 md:w-10 md:h-10 object-cover'
                      alt='Benefit icon'
                      src={benefit.icon || '/placeholder.svg'}
                    />
                    <div className='ml-[15px] md:ml-[20px] font-normal text-sm md:text-base text-[#FAB12F]'>
                      {benefit.text}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div 
            variants={fadeIn('left', 0.1)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once: false, amount: 0.7}}
            className='relative flex w-full max-w-[373px] mx-auto lg:mx-0'>
              <img
                className='w-full absolute bottom-0 left-0'
                alt='Rectangle'
                src='/rectcourse.svg'
              />
              <img
                className='relative bottom-[-1rem] w-full lg:w-auto h-auto z-10 mx-auto transition-transform duration-500 hover:scale-105'
                alt='belajar'
                src='/study.png'
              />
            </motion.div>
          </section>

          {/* Courses Section + Wave Divider */}
          <section
            className='relative z-0 w-full overflow-hidden bg-top bg-cover'
            style={{
              backgroundImage: 'url("./test.svg")',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'top',
            }}
          >
            {/* Content container */}
           <div className="relative z-10 pt-[320px] pb-[100px] px-2 md:px-[40px] lg:px-[80px] max-w-[1440px] mx-auto">
            <motion.h2
              variants={fadeIn("up", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 1 }}
              className="font-medium text-4xl md:text-4xl lg:text-5xl text-[#FAB12F] mb-[40px] md:mb-[30px] animate-fade-in"
            >
              Kursus Pembelajaran
            </motion.h2>

            {/* List Courses */}
            <motion.div
              variants={fadeIn("down", 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[14px]"
            >
              {courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/belajar/kursus/${course.id}`} // dynamic href based on course.id
                >
                  <Card
                    className={`group w-full max-w-[300px] mx-auto aspect-[345/347] rounded-[15px] 
                    bg-white shadow-[4px_7px_4px_#00000040] transition-all duration-300 
                    hover:bg-[#FAB12F] hover:scale-105 hover:shadow-xl cursor-pointer`}
                  >
                    <CardContent className="p-0 flex flex-col items-center h-full">
                      <div className="w-[80%] h-[100px] sm:h-[120px] md:h-[180px] lg:h-[200px] mt-[21px] mb-auto rounded-xl overflow-hidden">
                        <img
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          alt={course.title}
                          src={course.course_img || "/photoholder.png"}
                        />
                      </div>
                      <div
                        className={`w-full px-4 h-24 font-bold text-base sm:text-sm md:text-lg text-center flex items-center justify-center mb-[10px]
                        ${course.highlighted ? "text-white" : "text-[#FAB12F]"}
                        transition-colors duration-300 group-hover:text-white`}
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          lineHeight: "1.2em",
                          height: "2.4em", 
                        }}
                      >
                        {course.title}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </motion.div>
          </div>


            {/* Footer */}
            <Footer />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Landing;
