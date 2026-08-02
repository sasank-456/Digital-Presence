import React, { useEffect, useRef } from 'react';

const SPOTLIGHT_R = 260;

interface RevealLayerProps {
  image: string;
}

export const RevealLayer: React.FC<RevealLayerProps> = ({ image }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (smooth.current.x === -999) {
        smooth.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updateCursor = () => {
      if (smooth.current.x !== -999 && containerRef.current) {
        smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
        smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
        
        const x = smooth.current.x;
        const y = smooth.current.y;
        
        const maskImage = `radial-gradient(${SPOTLIGHT_R}px circle at ${x}px ${y}px, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0.75) 60%, rgba(255,255,255,0.4) 75%, rgba(255,255,255,0.12) 88%, rgba(255,255,255,0) 100%)`;
        
        containerRef.current.style.maskImage = maskImage;
        containerRef.current.style.webkitMaskImage = maskImage;
        containerRef.current.style.maskSize = '100% 100%';
        containerRef.current.style.webkitMaskSize = '100% 100%';
      }
      rafRef.current = requestAnimationFrame(updateCursor);
    };

    rafRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
      style={{ backgroundImage: `url(${image})` }}
    />
  );
};
