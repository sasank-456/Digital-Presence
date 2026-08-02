import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function ConcludingSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Parallax reveal effect as you scroll down to the bottom
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [0, 1, 1]);

  return (
    <footer 
      ref={containerRef} 
      className="relative w-full min-h-[60vh] bg-black flex flex-col items-center justify-end overflow-hidden border-t border-white/5 pt-20 pb-10"
    >
      
      {/* Dynamic Pulsing Background Glow */}
      <motion.div 
        animate={{ 
          opacity: [0.03, 0.07, 0.03],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-[800px] h-[40vh] bg-[#e8702a] blur-[120px] pointer-events-none rounded-t-[100%]" 
      />
      
      {/* Central Content */}
      <motion.div 
        style={{ y, opacity }}
        className="z-10 flex flex-col items-center text-center px-6 max-w-5xl mb-24"
      >
        <span className="text-[#e8702a] font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-8 block opacity-80">
          End of Journey
        </span>
        
        <h2 className="text-5xl md:text-6xl lg:text-[5.5rem] font-cormorant italic text-white leading-[1.1] font-light tracking-normal px-4">
          "The best way to predict the future is to <span className="text-[#e8702a]">invent it.</span>"
        </h2>
        
        <p className="mt-10 text-neutral-400 font-sans text-sm md:text-base tracking-wide max-w-2xl leading-relaxed">
          Thank you for exploring my digital workspace. I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
        </p>

        {/* Scroll to top button */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-12 group relative flex items-center justify-center w-14 h-14 rounded-full border border-white/20 bg-black/50 hover:bg-[#e8702a]/10 hover:border-[#e8702a]/50 transition-all duration-300"
        >
          <svg 
            width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="text-white group-hover:text-[#e8702a] group-hover:-translate-y-1 transition-all duration-300"
          >
            <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </motion.div>

      {/* Signature & Copyright */}
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-neutral-600 font-mono text-xs z-10 border-t border-white/10 pt-8">
        <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Sasank. All rights reserved.</p>
        <div className="flex gap-4 sm:gap-6 items-center">
          <span className="hover:text-white transition-colors cursor-pointer">Built with Intelligence</span>
          <span>•</span>
          <span className="hover:text-white transition-colors cursor-pointer">Designed for the Future</span>
        </div>
      </div>
    </footer>
  );
}
