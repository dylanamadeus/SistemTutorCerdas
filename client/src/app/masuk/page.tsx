// pages/index.tsx

import React from 'react';
import LoginPage from './login';
import VerifyModal from './Verify';
import SuccessModal from './Success'
import Navbar from '../Component/navbar';
import {Footer} from "../Component/Footer";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <LoginPage />
      </main>
    
    </div>
  );
}
