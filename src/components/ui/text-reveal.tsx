import { useRef } from "react";
import type { FC, ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface TextRevealProps {
  text: string;
  className?: string;
}

export const TextRevealByWord: FC<TextRevealProps> = ({ text, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 80%", "end 40%"],
  });

  const words = text.split(" ");

  return (
    <p ref={targetRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

interface WordProps {
  children: ReactNode;
  progress: any;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mr-2 md:mr-3 lg:mr-3 mt-1 md:mt-2">
      <span className="absolute opacity-30">{children}</span>
      <motion.span style={{ opacity }} className="text-white">
        {children}
      </motion.span>
    </span>
  );
};

export const CreativeTextReveal: FC<TextRevealProps> = ({ text, className }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
      rotateX: -45,
      scale: 0.8,
    },
  };

  return (
    <motion.p
      className={`flex flex-wrap perspective-1000 ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ margin: "-50px", once: false }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ display: "inline-block", marginRight: "0.25em", transformStyle: "preserve-3d" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};
