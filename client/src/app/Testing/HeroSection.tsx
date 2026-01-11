'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import FallingLeaves from './FallingLeaves';
import BackgroundEffects from './BackgroundEffects';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const leafRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Initial animation for the hero section
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
      );

      gsap.fromTo(
        subheadingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.8 }
      );

      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.1 }
      );

      gsap.fromTo(
        imageRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out', delay: 0.3 }
      );

      // Animate decorative elements
      leafRefs.current.forEach((leaf, index) => {
        if (leaf) {
          // Random starting position
          const xPos = Math.random() * 40 - 20;
          const yPos = Math.random() * 40 - 20;
          const delay = 1.2 + index * 0.2;

          gsap.fromTo(
            leaf,
            {
              x: xPos,
              y: yPos,
              rotation: Math.random() * 20 - 10,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              opacity: 0.8,
              duration: 1.5,
              ease: 'power2.out',
              delay: delay,
            }
          );

          // Continuous floating animation
          gsap.to(leaf, {
            y: 'random(-8, 8)',
            x: 'random(-5, 5)',
            rotation: 'random(-5, 5)',
            duration: 'random(3, 6)',
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: delay,
          });
        }
      });

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        y: 100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className='relative min-h-screen pt-24 overflow-hidden bg-gradient-to-b from-sage-50 to-mint-50'
    >
      {/* Decorative elements */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) leafRefs.current[i] = el;
          }}
          className='absolute opacity-0 pointer-events-none'
          style={{
            top: `${20 + i * 10}%`,
            left: `${(i % 2 === 0 ? 10 : 80) + Math.random() * 10}%`,
            width: `${30 + Math.random() * 20}px`,
            height: `${30 + Math.random() * 20}px`,
            borderRadius: '50%',
            background: `rgba(${
              i % 2 === 0 ? '156, 175, 136, 0.2' : '110, 178, 102, 0.15'
            })`,
            filter: 'blur(8px)',
          }}
        />
      ))}
      <BackgroundEffects />
      <div className='container mx-auto px-6 md:px-12'>
        <div className='flex flex-col items-center text-center max-w-4xl mx-auto pt-16 md:pt-24'>
          <h1
            ref={headingRef}
            className='text-4xl md:text-5xl lg:text-6xl font-bold text-forest-800 leading-tight'
          >
            Find Your Path to{' '}
            <span className='text-emerald-500'>Mental Wellbeing</span>
          </h1>

          <p
            ref={subheadingRef}
            className='mt-6 text-lg md:text-xl text-forest-700 max-w-2xl leading-relaxed'
          >
            At Safeena Academy, we provide compassionate guidance and
            evidence-based resources to help you navigate life's challenges with
            confidence and clarity.
          </p>

          <div
            ref={ctaRef}
            className='mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6'
          >
            <button className='px-8 py-3 rounded-full bg-gradient-to-r from-forest-600 to-emerald-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2'>
              Start Your Journey
            </button>

            <button className='px-8 py-3 rounded-full border-2 border-sage-300 text-forest-700 font-medium transition-all duration-300 hover:border-forest-500 hover:bg-sage-100 hover:shadow-md flex items-center justify-center gap-2 group'>
              Learn More
              <ArrowRight
                size={18}
                className='transition-transform duration-300 group-hover:translate-x-1'
              />
            </button>
          </div>
        </div>
      </div>

      {/* Hero image section */}
      <div ref={imageRef} className='w-full mt-16 md:mt-20'>
        <div className='relative max-w-6xl mx-auto px-6'>
          <div className='relative rounded-2xl overflow-hidden shadow-2xl shadow-forest-900/10'>
            <div className='absolute inset-0 bg-gradient-to-t from-forest-900/30 to-transparent z-10'></div>
            <Image
              src='/placeholder.svg?height=600&width=1200'
              width={1200}
              height={700}
              alt='Peaceful natural setting representing mental wellbeing'
              className='w-full h-auto object-cover'
              priority
            />
          </div>
        </div>
      </div>

      {/* Wave decoration at bottom */}
      <div className='absolute bottom-0 left-0 right-0 h-16 md:h-24 overflow-hidden'>
        <svg
          viewBox='0 0 1200 120'
          preserveAspectRatio='none'
          className='absolute bottom-0 w-full h-full'
        >
          <path
            d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C0,0,0,0,0,0Z'
            className='fill-sage-100'
          ></path>
        </svg>
      </div>
    </section>
  );
}
