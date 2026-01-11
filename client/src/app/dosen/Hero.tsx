import React, { useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import Navbar from '../Component/navbar';
import { motion } from 'framer-motion';
import { fadeIn } from '../variant';
import Link from 'next/link';

export const Hero = (): JSX.Element => {
  useEffect(() => {
    document.title = 'Teacher';
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

  return (
    <div className='min-h-screen w-full flex items-center justify-center p-4 md:p-6 lg:p-8'>
      <Navbar />
      <div className='flex flex-col items-center justify-center w-full max-w-[1066px] mx-auto'>
        <Card className='w-full border-none shadow-none bg-transparent'>
          <CardContent className='p-0'>
            <div className='flex flex-col items-center text-center px-4 md:px-6 lg:px-8'>
              <motion.h1 
              variants={fadeIn('down', 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: false, amount: 0.7}}
              className='font-outfit text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold leading-tight md:leading-normal'>
                <span className='text-[#DD0303] block sm:inline'>
                  Selamat Datang
                </span>
                <span className='text-[#FAB12F] block sm:inline'>
                  , Dosen Hebat!
                </span>
              </motion.h1>

              <motion.p 
              variants={fadeIn('left', 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: false, amount: 0.7}}
              className='mt-4 md:mt-6 max-w-[659px] text-sm sm:text-base text-[#1F1A17] font-outfit text-center'>
                Sebagai seorang dosen, Anda memainkan peran penting dalam memandu diskusi,
                membagikan informasi yang dapat dipercaya, dan membina lingkungan
                yang aman dan saling menghormati di mana setiap orang merasa didengar dan didukung. Bersama-sama,
                mari kita bangun ruang digital yang inklusif dan memberdayakan untuk
                belajar dan berbicara tentang kesehatan mental.
              </motion.p>
              <motion.div
                variants={fadeIn('right', 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.7 }}
                className="mt-6 md:mt-8 lg:mt-10 h-[45px] sm:h-[50px] md:h-[58px] w-full sm:max-w-[400px] md:max-w-[525px] rounded-[30px] bg-[#FAB12F] hover:bg-[#DD0303] text-base sm:text-lg md:text-xl font-medium flex items-center justify-center"
              >
                <Link href="#course">
                  <span className="text-white">Lihat Kursus</span>
                </Link>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Hero;
