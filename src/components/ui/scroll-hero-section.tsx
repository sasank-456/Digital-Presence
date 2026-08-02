'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

type Theme = 'system' | 'light' | 'dark';

export type ShipStickyHeaderProps = {
  items?: string[];
  showFooter?: boolean;
  theme?: Theme;
  animate?: boolean;
  hue?: number;
  startVh?: number;
  spaceVh?: number;
  debug?: boolean;
  taglineHTML?: string;
};

export function SkillsScrollHero({
  items = [
    'LLMs.',
    'Transformers.',
    'RAG.',
    'Prompt Engineering.',
    'LangChain.',
    'Fine-tuning (LoRA).',
    'Machine Learning.',
    'Deep Learning.',
    'NLP.',
    'Computer Vision.',
    'FastAPI.',
    'REST APIs.'
  ],
  showFooter = false,
  theme = 'dark',
  animate = true,
  hue = 24, // 24 roughly matches #e8702a
  startVh = 40,
  spaceVh = 40,
  debug = false,
  taglineHTML = `<span style="font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #e8702a; font-family: 'Syne', sans-serif;">Engineering Intelligence</span>`,
}: ShipStickyHeaderProps) {
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track the scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animate from top-center to middle-left
  // 0% to 15% of the section's scroll
  const headerLeft = useTransform(scrollYProgress, [0, 0.15], ["50%", "5%"]);
  const headerX = useTransform(scrollYProgress, [0, 0.15], ["-50%", "0%"]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], ["-30vh", "-8vh"]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.animate = String(animate);
    root.dataset.debug = String(debug);
    root.style.setProperty('--hue', String(hue));
    root.style.setProperty('--start', `${startVh}vh`);
    root.style.setProperty('--space', `${spaceVh}vh`);
  }, [theme, animate, debug, hue, startVh, spaceVh]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-black font-syne"
      style={
        {
          ['--count' as any]: items.length,
        } as React.CSSProperties
      }
    >
      <header className="content fluid z-10 relative pointer-events-none">
        
        {/* Animated Sticky Header */}
        <motion.h1 
          className="text-white absolute m-0 w-max whitespace-nowrap"
          style={{ 
            position: 'sticky', 
            top: 'calc(var(--start))', 
            left: headerLeft,
            x: headerX,
            y: headerY,
            opacity: headerOpacity,
            zIndex: 50
          }}
        >
          <span aria-hidden="true" className="font-bold md:font-black tracking-widest text-2xl md:text-5xl lg:text-6xl uppercase text-neutral-300 whitespace-nowrap">
            Expertise In
          </span>
          <span className="sr-only">Expertise in.</span>
        </motion.h1>

        <section className="content w-full flex justify-end pr-[5vw] md:pr-[4vw]" style={{ paddingTop: 'calc(var(--start) + 15vh)' }}>
          {/* Visible cycling words */}
          <ul aria-hidden="true" className="list-none p-0 m-0 text-right md:text-left flex-shrink-0 mr-4 md:mr-10">
            {items.map((word, i) => (
              <li key={i} style={{ ['--i' as any]: i } as React.CSSProperties} className="font-bold tracking-tight">
                {word}
              </li>
            ))}
          </ul>
        </section>
      </header>

      <main className="bg-black">
        <section className="bg-black flex items-center justify-center pt-[10vh]">
          <p
            className="text-center"
            dangerouslySetInnerHTML={{ __html: taglineHTML }}
          />
        </section>
      </main>

      {/* Styles ported and condensed; uses CSS custom props like the original */}
      <style jsx global>{`
        @layer base, stick, demo, debug;

        :root {
          --start: 40vh;
          --space: 40vh;
          --hue: 24;
          --accent: #e8702a;
          --switch: black;
          --font-size-min: 16;
          --font-size-max: 26;
          --font-ratio-min: 1.1;
          --font-ratio-max: 1.25;
          --font-width-min: 375;
          --font-width-max: 1500;
        }
        
        .fluid {
          --fluid-min: calc(var(--font-size-min) * pow(var(--font-ratio-min), var(--font-level, 0)));
          --fluid-max: calc(var(--font-size-max) * pow(var(--font-ratio-max), var(--font-level, 0)));
          --fluid-preferred: calc((var(--fluid-max) - var(--fluid-min)) / (var(--font-width-max) - var(--font-width-min)));
          --fluid-type: clamp(
            (var(--fluid-min) / 16) * 1rem,
            ((var(--fluid-min) / 16) * 1rem)
              - (((var(--fluid-preferred) * var(--font-width-min)) / 16) * 1rem)
              + (var(--fluid-preferred) * var(--variable-unit, 100vi)),
            (var(--fluid-max) / 16) * 1rem
          );
          font-size: var(--fluid-type);
        }

        /* Sticky header logic */
        header {
          --font-level: 5;
          --font-size-min: 18;
          position: sticky;
          top: calc((var(--count) - 1) * -1lh);
          line-height: 1.2;
          display: flex;
          align-items: start;
          width: 100%;
          margin-bottom: var(--space);
        }

        li {
          /* Create the wheel mask effect */
          --dimmed: color-mix(in oklch, white, #0000 92%);
          background:
            linear-gradient(
              180deg,
              var(--dimmed) 0 calc(var(--start) - 1.2lh),
              var(--accent) calc(var(--start) - 0.3lh) calc(var(--start) + 0.3lh),
              var(--dimmed) calc(var(--start) + 1.2lh)
            );
          background-attachment: fixed;
          color: #0000;
          background-clip: text;
          -webkit-background-clip: text;
        }

        main {
          width: 100%; height: 50vh; position: relative; z-index: 2; color: white; background-color: black;
        }
        main::before {
          content: ''; position: absolute; inset: 0; z-index: -1;
          background: black; border-radius: 1rem 1rem 0 0;
        }
        main section {
          height: 100%; width: 100%; display: flex; place-items: center; background-color: black;
        }

        /* View-timeline progressive enhancement */
        @supports (animation-timeline: view()) {
          [data-animate='true'] main { view-timeline: --section; }
          [data-animate='true'] main section p {
            animation: reveal both ease-in-out;
            animation-timeline: --section;
            animation-range: entry 20%;
          }
          @keyframes reveal { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        }

        /* Debug */
        [data-debug='true'] li { outline: 0.05em dashed currentColor; }
        [data-debug='true'] :is(h2, li:last-of-type) { outline: 0.05em dashed white; }
      `}</style>
    </div>
  );
}
