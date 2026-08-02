import { useEffect, useRef, useState } from 'react';
import { RevealLayer } from './components/RevealLayer';
import { FloatingDock } from './components/ui/floating-dock';
import { Cursor } from './components/ui/inverted-cursor';
import { TextRevealByWord, CreativeTextReveal } from './components/ui/text-reveal';
import { IconCloud } from './components/ui/interactive-icon-cloud';
import { ResumeTimeline } from './components/ResumeTimeline';
import { InteractiveImageAccordion } from './components/ui/interactive-image-accordion';
import { SpotlightReveal } from './components/ui/spotlight-reveal';
import { MinimalTransition } from './components/ui/minimal-transition';
import { ContactSection } from './components/ui/flip-links';
import { BookingModal } from './components/ui/booking-modal';
import { SkillsScrollHero } from './components/ui/scroll-hero-section';
import { ConcludingSection } from './components/ui/concluding-section';
import { motion } from 'motion/react';
import {
  IconUser,
  IconBriefcase,
  IconCode,
  IconTools,
  IconTrophy,
  IconFileText,
} from "@tabler/icons-react";

const BG_IMAGE_1 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';
const BG_IMAGE_2 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';

const techStackSlugs = [
  "typescript",
  "javascript",
  "python",
  "react",
  "nextdotjs",
  "nodedotjs",
  "tailwindcss",
  "prisma",
  "postgresql",
  "mongodb",
  "docker",
  "git",
  "github",
  "amazonwebservices",
  "googlecloud",
  "firebase",
  "vercel",
  "figma"
];

function App() {

  const navLinks = [
    {
      title: "About",
      icon: <IconUser className="h-full w-full text-white/80" />,
      href: "#about",
    },
    {
      title: "Experience",
      icon: <IconBriefcase className="h-full w-full text-white/80" />,
      href: "#experience",
    },
    {
      title: "Projects",
      icon: <IconCode className="h-full w-full text-white/80" />,
      href: "#projects",
    },
    {
      title: "Skills",
      icon: <IconTools className="h-full w-full text-white/80" />,
      href: "#skills",
    },
    {
      title: "Resume",
      icon: <IconFileText className="h-full w-full text-white/80" />,
      href: "#resume",
    },
  ];

  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black tracking-[-0.02em]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Custom circular inverted color cursor */}
      <Cursor size={40} />

      {/* Navigation (fixed, over hero) */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-start justify-between p-4 sm:p-5 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Logo and Label removed per request */}
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
          <FloatingDock items={navLinks} />
        </div>

        <button 
          onClick={() => setIsBookingOpen(true)}
          className="hidden md:flex relative group overflow-hidden bg-transparent text-white border border-white/30 text-sm font-bold px-12 py-3.5 rounded-full pointer-events-auto transition-all duration-500 hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] active:scale-95 items-center justify-center font-syne tracking-[0.15em] uppercase"
        >
          {/* Elegant smooth upward fill */}
          <div className="absolute inset-0 bg-white origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-full" />
          
          <span className="relative z-10 group-hover:text-black transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
            Contact Me
          </span>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden h-screen bg-black" style={{ height: '100dvh' }}>
        
        {/* Base image */}
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
        />

        {/* Reveal layer */}
        <RevealLayer image={BG_IMAGE_2} />

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50 text-white leading-[0.95]"
        >
          <span className="block font-playfair italic font-normal text-4xl sm:text-7xl md:text-8xl" style={{ letterSpacing: '-0.05em' }}>
            Layers holds
          </span>
          <span className="block font-normal text-4xl sm:text-7xl md:text-8xl -mt-0 sm:-mt-1" style={{ letterSpacing: '-0.08em' }}>
            tales of <span className="font-playfair italic text-[#e8702a] drop-shadow-[0_0_15px_rgba(232,112,42,0.5)] pr-1">mine</span>
          </span>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-6 sm:mt-10 flex items-center justify-center gap-4"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#e8702a] opacity-50"></div>
            <span className="font-cormorant italic text-3xl sm:text-5xl text-gray-300 font-light tracking-wider">
              Sasank
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#e8702a] opacity-50"></div>
          </motion.div>
        </motion.h1>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-50 pointer-events-none"
        >
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-white/50 drop-shadow-md">
            Scroll to explore
          </span>
          <div className="w-[1px] h-10 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-[40%] bg-white"
            />
          </div>
        </motion.div>

      </section>

      {/* About Section */}
      <section id="about" className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center py-20 px-5 sm:px-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 text-left text-white w-full items-center"
        >
          {/* Left Side: Text */}
          <div className="flex-1 space-y-12 text-xl md:text-2xl text-neutral-200 font-syne leading-relaxed max-w-none">
            <CreativeTextReveal text="Artificial intelligence isn't just what a model says. It's everything that happens before it speaks." />
            
            <CreativeTextReveal text="I enjoy building systems where architecture, retrieval, reasoning, and infrastructure work together to create AI people can trust." />
            
            <CreativeTextReveal text="From RAG pipelines to local-first AI and intelligent backend systems, my goal is simple:" />
            
            <CreativeTextReveal text="Build AI that's reliable before it's impressive." className="text-white font-semibold" />
          </div>

          {/* Right Side: Tech Stack Cloud */}
          <div className="w-full lg:w-[500px] shrink-0 flex items-center justify-center">
            <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden bg-transparent px-5 pb-5 pt-8">
              <IconCloud iconSlugs={techStackSlugs} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Resume Timeline Section */}
      <section id="experience" className="relative w-full bg-black">
        <ResumeTimeline />
      </section>

      {/* Featured Projects Accordion */}
      <InteractiveImageAccordion />

      {/* Skills Section */}
      <section id="skills" className="relative w-full bg-black z-10 pt-10">
        <SkillsScrollHero />
      </section>

      {/* Spotlight Reveal CTA (Resume) */}
      <SpotlightReveal />

      {/* Minimal Quote Transition */}
      <MinimalTransition />

      {/* Footer / Contact Section */}
      <ContactSection onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Concluding Footer Section */}
      <ConcludingSection />

      {/* Global Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}

export default App;
