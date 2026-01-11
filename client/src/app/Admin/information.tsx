'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRightIcon, Award, BarChart3Icon } from 'lucide-react';
import { fetchWithToken } from '@/lib/fetchWithToken';
import { motion } from 'framer-motion';
import { fadeIn } from '../variant';

const Index = (): JSX.Element => {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [materialCount, setMaterialCount] = useState(0);
  const [consultationCount, setConsultationCount] = useState(0);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const res = await fetchWithToken('/users/');
        const resData = await res.json();

        if (Array.isArray(resData)) {
          const students = resData.filter(user => user.role === 'student').length;
          const teachers = resData.filter(user => user.role === 'teacher').length;

          setStudentCount(students);
          setTeacherCount(teachers);
        } else {
          console.error("Unexpected response format:", resData);
        }

      } catch (error) {
        console.error("Failed to fetch user counts:", error);
      }
    }

    fetchCounts();
  }, []);

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const materialRes = await fetchWithToken('/materials');
        const materialData = await materialRes.json();
        
        if (Array.isArray(materialData)) {
          setMaterialCount(materialData.length);
        } else {
          console.error("Unexpected response format:", materialData);
        }
      } catch (error) {
        console.error("Failed to fetch materials:", error);
      }
    }

    fetchMaterials();
  }, []);

  useEffect(() => {
    async function fetchConsultation() {
      try {
        const consultRes = await fetchWithToken('/consultations/');
        const consultData = await consultRes.json();

        if (Array.isArray(consultData.consultations)) {
          setConsultationCount(consultData.consultations.length);
        } else {
          console.error("Expected 'consultations' to be an array but got:", consultData);
        }
      } catch (error) {
        console.error("Failed to fetch consultations:", error);
      }
    }

    fetchConsultation();
  }, []);

  const dashboardCards = [
    {
      title: 'Students',
      subtitle: `${studentCount} Accounts`,
      count: `${studentCount}`,
      imageUrl: '/student.png',
      bgColor: 'from-rose-400 to-rose-600',
      textColor: 'text-rose-100',
    },
    {
      title: 'Teachers',
      subtitle: `${teacherCount} Accounts`,
      count: `${teacherCount}`,
      imageUrl: '/teacher.png',
      bgColor: 'from-emerald-400 to-emerald-600',
      textColor: 'text-emerald-100',
    },
    {
      title: 'Courses',
      subtitle: `${materialCount} Courses`,
      count: `${materialCount}`,
      imageUrl: '/courses.png',
      bgColor: 'from-purple-400 to-purple-600',
      textColor: 'text-purple-100',
    },
    {
      title: 'Consultations',
      subtitle:`${consultationCount} Appliances`,
      count: `${consultationCount}`,
      imageUrl: '/consultations.png',
      bgColor: 'from-cyan-400 to-cyan-600',
      textColor: 'text-cyan-100',
    },
  ];

  return (
    <div className='relative min-h-screen w-full bg-gradient-to-br from-[#C1DAEE] to-[#337BBF] overflow-x-hidden'>
      <div className='container mx-auto px-4 py-16 md:px-8 lg:pt-80 relative z-10 flex flex-col h-full mt-[-9rem]'>
        <div className='flex flex-col items-center lg:items-start lg:flex-row lg:justify-between lg:gap-12 xl:gap-24'>
          {/* Left Side: Information Text */}
          <div className='max-w-lg mb-12 lg:mb-0 text-center lg:text-left order-2 lg:order-1'>
            <div className='inline-block mt-2 mb-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full'>
              <motion.div 
              variants={fadeIn('down', 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: false, amount: 0.7}}
              className='flex items-center gap-2'>
                <BarChart3Icon className='h-5 w-5 text-[#002c56]' />
                <span className='font-medium text-sm text-[#002c56]'>
                  Analytics Overview
                </span>
              </motion.div>
            </div>

            <motion.h1 
            variants={fadeIn('left', 0.1)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once: false, amount: 0.7}}
            className='font-outfit text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight'>
              <span className='text-[#002c56]'>Dashboard </span>
              <span className='text-[#edd500]'>Information</span>
            </motion.h1>

            <motion.p 
            variants={fadeIn('right', 0.1)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once: false, amount: 0.7}}
            className='font-outfit text-base md:text-lg font-medium leading-relaxed text-[#002c56]/90 mb-10'>
              Get a quick snapshot of the platform's activity — including the
              total number of student and teacher accounts, available courses,
              and consultation booking requests. Stay informed and manage
              everything efficiently from one place.
            </motion.p>
          </div>

          {/* Right Side: Dashboard Cards */}
          <div className='w-full max-w-xl order-1 lg:order-2'>
            <motion.div 
            variants={fadeIn('up', 0.1)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once: false, amount: 0.7}}
            className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              {dashboardCards.map((card, index) => (
                <Card
                  key={index}
                  className={`w-full overflow-hidden border-none shadow-lg bg-gradient-to-br ${card.bgColor} rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                >
                  <CardContent className='p-8'>
                    <div className='flex flex-col items-center justify-center text-center space-y-4'>
                      <img
                        src={card.imageUrl}
                        alt={card.title}
                        className='h-16 w-16 object-contain'
                      />
                      <div>
                        <h2 className='font-outfit text-2xl font-bold text-white'>
                          {card.title}
                        </h2>
                        <p className={`font-outfit text-base font-medium ${card.textColor}`}>
                          {card.subtitle}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>


            {/* Subtle decoration element */}
            <div className='hidden lg:block absolute top-20 right-20 w-32 h-32 bg-yellow-300 rounded-full blur-3xl opacity-20 -z-10'></div>
            <div className='hidden lg:block absolute bottom-20 left-20 w-40 h-40 bg-blue-300 rounded-full blur-3xl opacity-20 -z-10'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
