'use client';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

// 1. A sleek horizontal line with a glowing light that travels across it
export function GlowingLineDivider() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="w-full h-[1px] bg-white/5 relative overflow-hidden rounded-full">
        <motion.div 
          animate={{ left: ["-10%", "110%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 bottom-0 w-48 bg-gradient-to-r from-transparent via-[#e8702a]/80 to-transparent"
        />
      </div>
    </div>
  );
}

// 2. A very minimal, subtle infinite scrolling text ribbon
export function MarqueeDivider({ text = "ENGINEERING INTELLIGENCE •" }: { text?: string }) {
  return (
    <div className="w-full overflow-hidden flex items-center opacity-40 py-8 md:py-16 pointer-events-none select-none border-y border-white/[0.02]">
      <div className="animate-marquee-fast whitespace-nowrap flex items-center w-max text-[10px] md:text-xs font-mono tracking-[0.4em] uppercase text-neutral-500">
        {[...Array(8)].map((_, i) => (
          <span key={i} className="mx-8">{text}</span>
        ))}
      </div>
      <style jsx global>{`
        .animate-marquee-fast { animation: marqueeFast 25s linear infinite; }
        @keyframes marqueeFast {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// 3. A vertical line that "fills up" with the theme color as the user scrolls past it
export function VerticalScrollIndicator() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });
  
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.2]);

  return (
    <div ref={ref} className="w-full flex flex-col items-center justify-center py-16 pointer-events-none select-none gap-4">
      <motion.div style={{ opacity }} className="w-1.5 h-1.5 rounded-full bg-[#e8702a]/50" />
      <div className="w-[1px] h-24 md:h-32 bg-white/10 relative overflow-hidden rounded-full">
        <motion.div 
          style={{ height }}
          className="w-full bg-gradient-to-b from-[#e8702a] to-[#e8702a]/10 absolute top-0 left-0"
        />
      </div>
    </div>
  );
}
