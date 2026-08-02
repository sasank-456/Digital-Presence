import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import portraitImg from '../../assets/sasank-portrait.png';

export const SpotlightPortrait = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Start the spotlight way off-screen
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  
  // High-performance springs for buttery smooth trailing physics
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.touches[0].clientX - left);
    mouseY.set(e.touches[0].clientY - top);
  };

  const handleMouseLeave = () => {
    // Move flashlight offscreen smoothly when mouse leaves
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  // Generate dynamic CSS radial gradient mask
  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${smoothX}px ${smoothY}px, black 15%, transparent 85%)`;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[300px] md:h-full max-h-[800px] overflow-hidden rounded-[2rem] border border-neutral-900 shadow-2xl cursor-crosshair group bg-neutral-950"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchMove}
      onTouchEnd={handleMouseLeave}
    >
      {/* Base Layer - Dark, Moody, Desaturated */}
      <img 
        src={portraitImg} 
        alt="Sasank" 
        className="absolute inset-0 w-full h-full object-cover grayscale-[0.8] brightness-[0.35] contrast-125 transition-all duration-700"
      />
      
      {/* Reveal Layer - Full Vibrant Color with Dynamic Mask */}
      <motion.div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ WebkitMaskImage: maskImage, maskImage: maskImage }}
      >
        <img 
          src={portraitImg} 
          alt="Sasank Color" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      {/* Subtle instructions when not hovered */}
      <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 group-active:opacity-0 transition-opacity duration-500 pointer-events-none">
        <span className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white/50 text-sm tracking-widest uppercase font-syne border border-white/5">
          <span className="hidden md:inline">Hover to Reveal</span>
          <span className="inline md:hidden">Drag to Reveal</span>
        </span>
      </div>
    </div>
  );
};
