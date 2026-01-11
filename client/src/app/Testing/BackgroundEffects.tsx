'use client'
import React, { useEffect, useRef } from 'react';
import FallingLeaves from './FallingLeaves';

export default function BackgroundEffects() {
  const orbs = Array(8).fill(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    orbRefs.current.forEach((orb, index) => {
      if (orb) {
        const duration = 20 + Math.random() * 20;
        const delay = Math.random() * -20;

        orb.style.animation = `float ${duration}s ${delay}s infinite linear`;
      }
    });
  }, []);

  return (
    <div className='fixed inset-0 pointer-events-none overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-transparent via-sage-100/5 to-mint-100/10' />

      {/* Animated orbs */}
      {orbs.map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) orbRefs.current[i] = el;
          }}
          className='absolute rounded-full blur-3xl opacity-20'
          style={{
            width: `${100 + Math.random() * 200}px`,
            height: `${100 + Math.random() * 200}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${
              i % 2 === 0
                ? 'rgba(156, 175, 136, 0.3)'
                : 'rgba(80, 200, 120, 0.2)'
            } 0%, transparent 70%)`,
          }}
        />
      ))}

      {/* Ambient gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-sage-50/10' />

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(50px, 100px) rotate(90deg);
          }
          50% {
            transform: translate(100px, 0) rotate(180deg);
          }
          75% {
            transform: translate(50px, -100px) rotate(270deg);
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
          }
        }
      `}</style>

      <FallingLeaves />
    </div>
  );
}
