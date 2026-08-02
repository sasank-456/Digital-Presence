'use client';
import React from 'react';

export function MinimalTransition() {
  return (
    <section className="relative w-full py-24 md:py-32 min-h-[30vh] bg-black overflow-hidden flex items-center">

      {/* Interactive Infinite Marquee */}
      <div className="relative flex overflow-x-hidden w-full group">
        <div className="animate-marquee whitespace-nowrap flex items-center w-max py-8">
          {[...Array(4)].map((_, i) => (
            <span 
              key={i} 
              className="text-transparent font-syne font-black text-6xl md:text-8xl lg:text-[8vw] tracking-tighter uppercase mx-4 md:mx-6 text-outline hover:text-white transition-all duration-300 cursor-crosshair select-none"
            >
              ENGINEERING INTELLIGENCE • BEYOND THE CODE • 
            </span>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .text-outline {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25);
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        /* Pause the marquee when the user hovers over the container */
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
