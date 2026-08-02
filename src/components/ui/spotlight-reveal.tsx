"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";

export const SpotlightReveal = () => {
  const imgLayerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const imgLayer = imgLayerRef.current;
    const container = containerRef.current;
    if (!imgLayer || !container) return;

    const SPOTLIGHT_R = 260;
    
    const mouse = { x: -999, y: -999 };
    const smooth = { x: -999, y: -999 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Calculate relative mouse position inside the container
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      if (smooth.x === -999) {
        smooth.x = mouse.x;
        smooth.y = mouse.y;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const loop = () => {
      if (smooth.x !== -999) {
        smooth.x += (mouse.x - smooth.x) * 0.1;
        smooth.y += (mouse.y - smooth.y) * 0.1;

        const maskImage = `radial-gradient(${SPOTLIGHT_R}px circle at ${smooth.x}px ${smooth.y}px, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0.12) 88%, rgba(255,255,255,0) 100%)`;

        imgLayer.style.webkitMaskImage = maskImage;
        imgLayer.style.maskImage = maskImage;
        imgLayer.style.webkitMaskSize = "100% 100%";
        imgLayer.style.maskSize = "100% 100%";
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Using the Figma assets from the user's provided snippet
  const baseImg = "https://soft-zoom-63098134.figma.site/_assets/v11/5c9f982199fde1d9b85a20e5396f0fa7bacaf9a3.png?w=2560";
  const revealImg = "https://soft-zoom-63098134.figma.site/_assets/v11/6be2165e31648955b4e071f4cf2a50bc572b9bfd.png?w=1536";

  return (
    <section 
      id="resume"
      ref={containerRef}
      className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black flex items-center justify-center cursor-crosshair"
    >
      
      {/* Big Background Text */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-5">
        <h2 className="font-syne font-bold text-[12rem] md:text-[20rem] text-white tracking-tighter whitespace-nowrap select-none">
          VISION
        </h2>
      </div>

      {/* Base Image (Darkened / Grayscale for dark mode) */}
      <div 
        className="absolute inset-0 z-10 bg-center bg-no-repeat bg-cover opacity-30 mix-blend-luminosity"
        style={{ backgroundImage: `url('${baseImg}')`, backgroundPosition: "60% center" }}
      ></div>

      {/* Reveal Image layer (Colored/Bright masked by spotlight) */}
      <div 
        ref={imgLayerRef}
        className="absolute inset-0 z-20 bg-center bg-no-repeat bg-cover pointer-events-none"
        style={{ backgroundImage: `url('${revealImg}')`, backgroundPosition: "60% center" }}
      ></div>

      {/* Content overlay */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center p-8 w-full max-w-7xl mx-auto pointer-events-none pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-8 md:gap-12"
        >
          <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-light font-cormorant italic tracking-normal text-white drop-shadow-2xl max-w-5xl leading-[1.1] px-4">
            I build compelling AI systems & motion that make ideas shine.
          </h1>

          <motion.a 
            href="https://drive.google.com/file/d/1MqQdbn4NTCZsy-aAg3QVpWxROwPUsul9/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pointer-events-auto group relative flex items-center justify-center gap-4 bg-white text-black px-8 md:px-10 py-4 md:py-5 rounded-full font-medium text-lg md:text-xl transition-all shadow-2xl hover:shadow-[#e8702a]/20"
          >
            <span>The Mind Behind the Models</span>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#e8702a] text-white group-hover:translate-x-1 transition-transform">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L13 5M13 5H6M13 5V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.a>
        </motion.div>
      </div>

    </section>
  );
};
