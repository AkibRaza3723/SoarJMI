'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

// Using the same generated image 5 times as requested
const images = Array(5).fill('https://res.cloudinary.com/wyuzj0og/image/upload/v1784901183/team_wmr4la.jpg');

export default function MovingGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // We set the initial position to -50% (which means the second set of images is visible)
    // and animate to 0% (which means the first set of images is visible).
    // This creates the "left to right" movement.
    gsap.set(containerRef.current, { x: "-50%" });

    tweenRef.current = gsap.to(containerRef.current, {
      x: "0%",
      ease: "none",
      duration: 30, // Adjust this to make it faster/slower
      repeat: -1,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    // Check if the device supports hover (ignores touch devices like phones)
    if (window.matchMedia('(hover: hover)').matches) {
      tweenRef.current?.pause();
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      tweenRef.current?.resume();
    }
  };

  return (
    <section className="moving-gallery-section">
      <div className="gallery-header">
        <p className="section-eyebrow">Experience</p>
        <h2 className="section-title">
          Life at <span className="accent-gradient">SoarJMI</span>
        </h2>
      </div>

      <div 
        className="w-full overflow-hidden py-4 md:py-8"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          ref={containerRef} 
          className="flex w-max gap-6 md:gap-8 px-4 md:px-8"
        >
          {/* We render the array twice for the seamless loop */}
          {[...images, ...images].map((src, index) => (
            <div 
              key={index} 
              className="relative w-70 h-50 md:w-112.5 md:h-75 rounded-2xl md:rounded-[24px] overflow-hidden shrink-0 group cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.15)] border border-[var(--border)]"
            >
              <Image 
                src={src} 
                alt={`Gallery image ${index + 1}`} 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 280px, 450px"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .moving-gallery-section {
          padding: 100px 6%;
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
        }

        .moving-gallery-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: var(--gradient-accent);
          opacity: 0.35;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 60px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          padding: 0 20px;
        }

        .section-eyebrow {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--accent-1);
          margin-bottom: 12px;
        }

        .section-title {
          margin-bottom: 16px;
        }

        @media (max-width: 480px) {
          .moving-gallery-section {
            padding: 60px 4%;
          }
        }
      `}</style>
    </section>
  );
}
