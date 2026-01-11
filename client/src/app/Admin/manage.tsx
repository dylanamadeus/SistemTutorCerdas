'use client';
import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn } from '../variant';

// Tipe data untuk kartu
interface CardData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  linkText: string;
  linkUrl: string;
}

// Komponen Card
const Card: React.FC<{ data: CardData }> = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className='w-full bg-white rounded-3xl overflow-hidden shadow-lg transition-all duration-300 min-h-[500px] flex flex-col'
      variants={fadeIn('left', 0.1)}
      initial='hidden'
      whileInView={'show'}
      viewport={{once: false, amount: 0.7}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className='relative h-64 flex items-center justify-center bg-gray'>
        <img
          src={data.imageUrl}
          alt={data.title}
          className={`max-h-[90%] max-w-[90%] transition-transform duration-700 ease-out ${
            isHovered ? 'scale-100' : 'scale-90'
          }`}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>
      </div>

      {/* Text Content Section */}
      <div className='flex-1 p-6 flex flex-col justify-between'>
        <div>
          <h2 className='text-xl lg:text-2xl font-semibold text-gray-800 mb-3'>
            {data.title}
          </h2>
          <p className='text-gray-600 text-base lg:text-lg leading-relaxed mb-5'>
            {data.description}
          </p>
        </div>

        <a
          href={data.linkUrl}
          className='inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-base lg:text-lg transition-colors duration-200'
        >
          {data.linkText}
          <ArrowUpRight
            className={`w-5 h-5 ml-1 transition-transform duration-200 ${
              isHovered ? 'translate-x-1 -translate-y-1' : ''
            }`}
          />
        </a>
      </div>
    </motion.div>
  );
};

// Komponen Container
const CardContainer: React.FC<{ cards: CardData[] }> = ({ cards }) => {
  return (
    <div className='min-h-screen w-full py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center'>
      <div className='w-full max-w-[1440px]'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'>
          {cards.map((card) => (
            <Card key={card.id} data={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Data Kartu
const cardsData: CardData[] = [
  {
    id: 1,
    title: 'Kelola Akun',
    description:
      'Dengan mudah melihat, mengedit, dan mengatur semua akun siswa dan guru dari satu halaman terpusat. Jaga data pengguna tetap akurat dan terbaru untuk memastikan pengalaman yang lancar di seluruh platform.',
    imageUrl: '/manage.png', // <- path ke gambar lokal
    linkText: 'Kelola',
    linkUrl: '/Manage',
  },
  {
    id: 2,
    title: 'Pemesanan Konsultasi',
    description:
      'Lihat dan kelola semua permintaan konsultasi secara efisien. Setujui, jadwalkan ulang, atau batalkan pemesanan untuk membantu memastikan proses konsultasi yang lancar dan mendukung bagi siswa maupun konselor.',
    imageUrl:
      '/consultation.png',
    linkText: 'Kelola',
    linkUrl: '/Booking',
  },
];

// Komponen Utama manage
const manage: React.FC = () => {
  return (
    <div className='min-h-screen w-full '>
      <CardContainer cards={cardsData} />
    </div>
  );
};

export default manage;
