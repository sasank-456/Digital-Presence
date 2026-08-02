import React from "react";
import { Timeline } from "./ui/timeline";
import nexSeva1 from "../assets/projects/nexseva-1.png";
import nexSeva2 from "../assets/projects/nexseva-2.png";
import nexSeva3 from "../assets/projects/nexseva-3.png";
import nexSeva4 from "../assets/projects/nexseva-4.png";
import lnt1 from "../assets/projects/lnt-1.png";
import lntCert from "../assets/projects/lnt-certificate.png";
import ofmCert from "../assets/projects/ofm-certificate.png";

export function ResumeTimeline() {
  const data = [
    {
      title: "Apr 2026 - June 2026",
      content: (
        <div>
          <h4 className="text-xl md:text-2xl font-bold text-white mb-2 font-syne flex items-center gap-3">
            Google Solution Challenge 2026
            <span className="text-xs font-sans font-medium text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded-md">Hackathon</span>
          </h4>
          <p className="text-[#e8702a] text-sm font-semibold mb-4">Global Hackathon Leadership</p>
          <p className="text-neutral-400 text-sm md:text-base font-normal mb-8 leading-relaxed">
            Led a global team to develop NexSeva—an integrated disaster management platform enabling offline voice-based data collection, AI-powered needs assessment, and geo-spatial heatmaps among 15,000+ competing teams.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={nexSeva1}
              alt="NexSeva Dashboard"
              className="rounded-lg object-cover h-24 md:h-44 lg:h-60 w-full shadow-lg border border-neutral-800 transition-transform duration-500 hover:scale-[1.05]"
            />
            <img
              src={nexSeva2}
              alt="NexSeva Analytics"
              className="rounded-lg object-cover h-24 md:h-44 lg:h-60 w-full shadow-lg border border-neutral-800 transition-transform duration-500 hover:scale-[1.05]"
            />
            <img
              src={nexSeva3}
              alt="NexSeva Map View"
              className="rounded-lg object-cover h-24 md:h-44 lg:h-60 w-full shadow-lg border border-neutral-800 transition-transform duration-500 hover:scale-[1.05]"
            />
            <img
              src={nexSeva4}
              alt="NexSeva Details"
              className="rounded-lg object-cover h-24 md:h-44 lg:h-60 w-full shadow-lg border border-neutral-800 transition-transform duration-500 hover:scale-[1.05]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Dec 2025 - Jan 2026",
      content: (
        <div>
          <h4 className="text-xl md:text-2xl font-bold text-white mb-2 font-syne flex items-center gap-3">
            L&T Technology Services
            <span className="text-xs font-sans font-medium text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded-md">Internship</span>
          </h4>
          <p className="text-[#e8702a] text-sm font-semibold mb-4">Generative AI Internship</p>
          <p className="text-neutral-400 text-sm md:text-base font-normal mb-8 leading-relaxed">
            Acquired hands-on experience in Generative AI by developing RAG-based conversational AI workflows. Implemented NLP preprocessing (text cleaning, normalization, tokenization), built LLM-based context-aware retrieval modules, deployed text classification solutions, and created ANN-based prediction models.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={lnt1}
              alt="L&T ID Badge"
              className="rounded-lg object-cover h-24 md:h-44 lg:h-60 w-full shadow-lg border border-neutral-800 transition-transform duration-500 hover:scale-[1.05]"
            />
            <img
              src={lntCert}
              alt="L&T Internship Certificate"
              className="rounded-lg object-cover h-24 md:h-44 lg:h-60 w-full shadow-lg border border-neutral-800 transition-transform duration-500 hover:scale-[1.05]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "June 2025 - July 2025",
      content: (
        <div>
          <h4 className="text-xl md:text-2xl font-bold text-white mb-2 font-syne flex flex-wrap items-center gap-3">
            Ordnance Factory Medak, Ministry of Defence
            <span className="text-xs font-sans font-medium text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded-md">Internship</span>
          </h4>
          <p className="text-[#e8702a] text-sm font-semibold mb-4">Web Development Internship</p>
          <p className="text-neutral-400 text-sm md:text-base font-normal mb-8 leading-relaxed">
            Developed and maintained a responsive internal web portal using HTML, CSS, JavaScript, and PHP, improving portal performance and optimizing operational workflows, resulting in an 18% increase in efficiency and reduced issue resolution time by 3 hours.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src={ofmCert}
              alt="Ordnance Factory Internship Certificate"
              className="rounded-lg object-cover h-64 md:h-80 w-full shadow-lg border border-neutral-800 object-top transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2023 - 2027",
      content: (
        <div>
          <h4 className="text-xl md:text-2xl font-bold text-white mb-2 font-syne flex items-center gap-3">
            SASTRA DEEMED UNIVERSITY
            <span className="text-xs font-sans font-medium text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded-md">Education</span>
          </h4>
          <p className="text-[#e8702a] text-sm font-semibold mb-4">Bachelor of Computer Science and Engineering</p>
          <p className="text-neutral-400 text-sm md:text-base font-normal mb-4 leading-relaxed">
            Pursuing a comprehensive curriculum in Computer Science, focusing on Machine Learning, Deep Learning, OOP, and Modern Backend architectures.
          </p>
          
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
              <h5 className="text-white font-bold mb-2">Generative AI</h5>
              <p className="text-neutral-400 text-xs md:text-sm">LLMs, Transformers, RAG, Prompt Engineering, LangChain, Fine-tuning (LoRA)</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
              <h5 className="text-white font-bold mb-2">Machine Learning</h5>
              <p className="text-neutral-400 text-xs md:text-sm">Deep Learning, NLP, Computer Vision</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
              <h5 className="text-white font-bold mb-2">Backend</h5>
              <p className="text-neutral-400 text-xs md:text-sm">Python, FastAPI, REST APIs, TypeScript, Node.js</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
              <h5 className="text-white font-bold mb-2">Databases & Tools</h5>
              <p className="text-neutral-400 text-xs md:text-sm">MySQL, Vector Databases (ChromaDB), Git, Docker, Ollama</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
