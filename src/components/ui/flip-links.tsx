import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { BookingModal } from "./booking-modal";

const ScrubVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const currentTimeDisplay = useRef(0);
  const isSeeking = useRef(false);
  const lastMouseX = useRef<number | null>(null);
  const rafId = useRef<number>();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    const handleMouseMove = (e: MouseEvent) => {
      if (!video.duration) return;
      
      // Absolute scrubbing: The video timeline perfectly maps to the cursor's X position on screen
      // This ensures the Llama directly follows the cursor from left to right.
      const progress = e.clientX / window.innerWidth;
      targetTime.current = progress * video.duration;
    };

    const seekVideo = () => {
      if (!video) return;
      if (Math.abs(video.currentTime - currentTimeDisplay.current) > 0.01) {
        isSeeking.current = true;
        video.currentTime = currentTimeDisplay.current;
      }
    };

    const handleSeeked = () => {
      isSeeking.current = false;
    };

    const updateLoop = () => {
      if (video && video.duration) {
         // Buttery smooth and highly responsive fluid transition (Lerp factor 0.08)
         currentTimeDisplay.current += (targetTime.current - currentTimeDisplay.current) * 0.08;
         
         if (!isSeeking.current && Math.abs(video.currentTime - currentTimeDisplay.current) > 0.02) {
           seekVideo();
         }
      }
      rafId.current = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("mousemove", handleMouseMove);
    video.addEventListener("seeked", handleSeeked);
    rafId.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      video.removeEventListener("seeked", handleSeeked);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none group">
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4"
        className="w-full h-full object-cover grayscale opacity-70 mix-blend-lighten transition-opacity duration-700"
        muted
        playsInline
      />
      {/* Dot grid overlay as specified */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />
      {/* Inner Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80" />
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent" />
    </div>
  );
};

export const ContactSection = ({ onOpenBooking }: { onOpenBooking: () => void }) => {
  return (
    <>
      <section id="contact" className="relative flex flex-col md:flex-row items-stretch justify-center bg-black w-full min-h-[100dvh] md:h-[100dvh] text-white overflow-hidden">
        
        {/* Left Side: Contact Content */}
        <div className="w-full md:w-1/2 p-4 md:p-8 lg:p-10 flex flex-col justify-center z-10">
          <div className="max-w-3xl mx-auto w-full z-10 flex flex-col items-start h-full justify-center">
            <div className="mb-6 md:mb-10">
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[#e8702a] font-syne font-semibold tracking-widest uppercase mb-4"
              >
                Ready to build the future?
              </motion.p>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold font-syne"
              >
                Let's Connect
              </motion.h2>
            </div>

            <div className="flex flex-col items-start gap-0 md:gap-1 w-full">
              <FlipLink onClick={onOpenBooking}>Meeting</FlipLink>
              <FlipLink href="mailto:sasankgade@gmail.com">Email</FlipLink>
              <FlipLink href="https://www.linkedin.com/in/gadedhanasasank/">Linkedin</FlipLink>
              <FlipLink href="https://github.com/sasank-456">Github</FlipLink>
              <FlipLink href="https://www.instagram.com/sasank._.04?igsh=eDFibXl1aHZpdDFv">Instagram</FlipLink>
            </div>
          </div>
        </div>

        {/* Right Side: Mouse-Scrubbed Video Hero from Prompt */}
        <div className="hidden md:block relative w-full md:w-1/2 h-full z-0 overflow-hidden">
          <ScrubVideo />
        </div>
      </section>
    </>
  );
};

const FlipLink = ({ children, href, onClick }: { children: string; href?: string; onClick?: () => void }) => {
  const content = (
    <>
      <div className="flex justify-start">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[110%]"
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 flex justify-start text-[#e8702a]">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block translate-y-[110%] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </>
  );

  const className = "group relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase tracking-tighter sm:text-6xl md:text-[6rem] lg:text-[7rem] xl:text-[8rem] font-syne text-neutral-400 hover:text-white transition-colors duration-300";
  const style = { lineHeight: 0.85 };

  if (onClick) {
    return (
      <button onClick={onClick} className={className} style={style}>
        {content}
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
      {content}
    </a>
  );
};

