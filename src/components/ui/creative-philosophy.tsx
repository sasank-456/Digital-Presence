'use client';
import { motion } from 'motion/react';
import React from 'react';

const philosophies = [
  {
    title: "Local-First AI",
    desc: "Bringing intelligence to the edge. Prioritizing privacy, reduced latency, and systems that work seamlessly without constant cloud dependency."
  },
  {
    title: "Agentic Systems",
    desc: "Building beyond simple chat. Designing autonomous workflows, robust RAG pipelines, and intelligent agents that solve complex problems."
  },
  {
    title: "Scalable Architecture",
    desc: "From local models to distributed cloud infrastructure. Engineering systems that scale elegantly from prototype to production."
  }
];

export function CreativePhilosophy() {
  return (
    <section className="relative w-full bg-black py-24 md:py-32 overflow-hidden border-t border-white/5">
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e8702a]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      {/* Interactive Infinite Marquee */}
      <div className="relative flex overflow-x-hidden w-full mb-20 md:mb-32 group">
        <div className="animate-marquee whitespace-nowrap flex items-center w-max">
          {[...Array(4)].map((_, i) => (
            <span 
              key={i} 
              className="text-transparent font-syne font-black text-6xl md:text-8xl lg:text-[10vw] tracking-tighter uppercase mx-4 text-outline hover:text-white hover:scale-105 transition-all duration-300 cursor-crosshair select-none"
            >
              ENGINEERING INTELLIGENCE • BEYOND THE CODE • 
            </span>
          ))}
        </div>
      </div>

      {/* Focus Area Cards */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {philosophies.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="group/card relative p-8 md:p-10 rounded-3xl bg-neutral-950/50 border border-white/10 overflow-hidden hover:border-[#e8702a]/40 transition-colors duration-500 backdrop-blur-sm"
          >
            {/* Hover Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#e8702a]/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {/* Number Indicator */}
            <span className="absolute top-8 right-8 text-white/10 font-mono font-bold text-5xl group-hover/card:text-[#e8702a]/20 transition-colors duration-500 pointer-events-none select-none">
              0{i + 1}
            </span>

            <h3 className="relative z-10 text-2xl md:text-3xl font-syne font-bold text-white mb-4 group-hover/card:text-[#e8702a] transition-colors duration-500 pr-10">
              {item.title}
            </h3>
            
            <p className="relative z-10 text-neutral-400 font-sans text-sm md:text-base leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        .text-outline {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25);
        }
        
        .animate-marquee {
          animation: marquee 35s linear infinite;
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
