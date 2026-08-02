import React, { useState } from 'react';
import simbaApp from "../../assets/projects/simba-app.png";
import nexSevaApp from "../../assets/projects/nexseva-app-poster.jpg";
import aiCommanderApp from "../../assets/projects/ai-commander-poster.jpg";
import yoloApp from "../../assets/projects/yolo-rail-poster.jpg";
import imdbApp from "../../assets/projects/imdb-sentiment-poster.png";
import { IconBrandGithub, IconInfoCircle, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";

// --- Data for the image accordion ---
interface AccordionItemData {
  id: number;
  title: string;
  imageUrl: string;
  githubUrl: string;
  description: string;
  techStack: string[];
}

const accordionItems: AccordionItemData[] = [
  {
    id: 1,
    title: 'Simba - AI Companion',
    imageUrl: simbaApp,
    githubUrl: "https://github.com/sasank-456/PIXCEL-CAT-LOCAL_RAG_APPLICATION-",
    description: "Simba is a local-first, privacy-focused AI companion designed for developers. It runs seamlessly entirely on-device without internet access, providing coding assistance, file context awareness, and lightning-fast responses without compromising your code privacy.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Local LLMs", "Node.js"],
  },
  {
    id: 2,
    title: 'NexSeva Platform',
    imageUrl: nexSevaApp,
    githubUrl: "https://github.com/sasank-456/NEXSEVA-Intelligence_Meets_Compassion",
    description: "An award-winning, AI-powered disaster management platform built for the Google Solution Challenge 2026. NexSeva connects people, data, and resources in real-time. Features include offline voice reporting, geo-spatial heatmaps, and AI-driven needs assessment for critical relief efforts.",
    techStack: ["React", "Python", "TensorFlow", "Firebase", "Google Cloud"],
  },
  {
    id: 3,
    title: 'AI Incident Commander',
    imageUrl: aiCommanderApp,
    githubUrl: "https://github.com/sasank-456/AI-COMMANDER",
    description: "An advanced, AI-powered root cause triage system for distributed architectures. By analyzing real-time alerts and system telemetry, the Incident Commander automatically builds dependency graphs and ranks probable root causes, reducing triage time by over 80%.",
    techStack: ["Next.js", "Python", "Kafka", "PostgreSQL", "Machine Learning"],
  },
  {
    id: 4,
    title: 'YOLO Rail Defect',
    imageUrl: yoloApp,
    githubUrl: "https://github.com/yourusername/yolo-rail",
    description: "A highly accurate computer vision system utilizing the YOLOv8 architecture to detect critical surface errors on railway tracks. Capable of identifying cracks, missing fasteners, and spalling with over 90% confidence in real-time video streams, enhancing railway safety and maintenance.",
    techStack: ["Python", "YOLOv8", "OpenCV", "PyTorch", "C++"],
  },
  {
    id: 5,
    title: 'IMDb Sentiment Analysis',
    imageUrl: imdbApp,
    githubUrl: "https://github.com/yourusername/imdb-sentiment",
    description: "A deep learning application that analyzes movie reviews to detect underlying sentiments. Trained on a massive 50K review dataset using an LSTM network, the model accurately classifies text into positive, neutral, or negative categories with high precision.",
    techStack: ["Python", "TensorFlow", "Keras", "NLTK", "React"],
  },
];

// --- Accordion Item Component ---
const AccordionItem = ({
  item,
  isActive,
  onMouseEnter,
  onInfoClick,
}: {
  item: AccordionItemData;
  isActive: boolean;
  onMouseEnter: () => void;
  onInfoClick: (item: AccordionItemData) => void;
}) => {
  return (
    <div
      className={`
        relative h-[450px] rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-700 ease-in-out border border-neutral-800 group
        ${isActive ? 'w-[160px] sm:w-[250px] md:w-[400px]' : 'w-[35px] sm:w-[50px] md:w-[60px]'}
      `}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e: any) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x450/2d3748/ffffff?text=Image+Error'; }}
      />
      {/* Gradient overlay for text readability at the bottom, instead of full black overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-700 pointer-events-none"></div>

      {/* Buttons Container (Only visible when active) */}
      <div 
        className={`absolute top-4 right-4 z-30 flex items-center gap-2 transition-all duration-300
        ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onInfoClick(item);
          }}
          className="p-2 rounded-full bg-black/80 border border-white/10 hover:bg-[#e8702a] hover:border-[#e8702a] text-white backdrop-blur-md transition-all duration-300 shadow-xl group/info"
          title="View Project Details"
        >
          <IconInfoCircle size={24} stroke={1.5} className="group-hover/info:scale-110 transition-transform" />
        </button>
        <a
          href={item.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-black/80 border border-white/10 hover:bg-[#e8702a] hover:border-[#e8702a] text-white backdrop-blur-md transition-all duration-300 shadow-xl group/git"
          title="View Source on GitHub"
          onClick={(e) => e.stopPropagation()}
        >
          <IconBrandGithub size={24} stroke={1.5} className="group-hover/git:scale-110 transition-transform" />
        </a>
      </div>

      {/* Caption Text */}
      <span
        className={`
          absolute text-white font-syne font-semibold whitespace-nowrap
          transition-all duration-300 ease-in-out pointer-events-none
          ${
            isActive
              ? 'text-base sm:text-lg bottom-6 left-1/2 -translate-x-1/2 rotate-0 opacity-100' // Active state
              : 'text-sm sm:text-lg w-auto text-left bottom-16 sm:bottom-24 left-1/2 -translate-x-1/2 rotate-90 opacity-70' // Inactive state
          }
        `}
      >
        {item.title}
      </span>
    </div>
  );
};

// --- Main App Component ---
export function InteractiveImageAccordion() {
  const [activeIndex, setActiveIndex] = useState(4);
  const [selectedProject, setSelectedProject] = useState<AccordionItemData | null>(null);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div id="projects" className="bg-black font-sans text-white pt-12 md:pt-24 pb-4 md:pb-8 border-t-0">
      <section className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 relative">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-12">
          
          {/* Left Side: Text Content */}
          <div className="w-full xl:w-5/12 text-center xl:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] tracking-normal font-cormorant italic drop-shadow-xl">
              Featured Projects & Ventures
            </h1>
            <p className="mt-6 text-base md:text-lg text-neutral-400 max-w-xl mx-auto xl:mx-0 leading-relaxed font-sans">
              A showcase of my recent work in Generative AI, computer vision, and scalable system design. Explore the interactive tiles to learn more about each project before diving into the details.
            </p>
          </div>

          {/* Right Side: Image Accordion */}
          <div className="w-full xl:w-7/12 overflow-hidden">
            <div className="flex flex-row items-center justify-center xl:justify-end gap-2 md:gap-4 p-2">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                  onInfoClick={setSelectedProject}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-[#e8702a] text-white border border-white/10 transition-colors backdrop-blur-sm"
              >
                <IconX size={24} />
              </button>

              {/* Left Image Section */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-950/20 md:to-neutral-950 hidden md:block"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent to-neutral-950 block md:hidden"></div>
              </div>

              {/* Right Content Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <motion.h2 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-4xl font-bold font-syne text-white mb-6"
                >
                  {selectedProject.title}
                </motion.h2>
                
                <motion.p 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-neutral-300 leading-relaxed text-base md:text-lg mb-8"
                >
                  {selectedProject.description}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-sm uppercase tracking-widest text-[#e8702a] font-bold mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-sm text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-10"
                >
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors"
                  >
                    <IconBrandGithub size={20} />
                    View Repository
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
