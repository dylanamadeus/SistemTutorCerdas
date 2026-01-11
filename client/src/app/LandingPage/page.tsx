import React from 'react';
import LandingPage from './Hero';
import Navbar from '../Component/navbar';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Head>
        <title>LMS</title>
        <link rel="icon" href="/Logo.png" />
      </Head> */}
      <Navbar />
      <main className="flex-grow">
        <LandingPage />
      </main>
    
    </div>
  );
}
