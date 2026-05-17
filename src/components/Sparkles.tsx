import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const Sparkles = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-wedding-gold rounded-full"
          initial={{
            opacity: 0,
            x: typeof window !== 'undefined' ? window.innerWidth * 0.5 + Math.random() * (window.innerWidth * 0.5) : 1000,
            y: -50,
            scale: Math.random() * 0.8 + 0.5,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: typeof window !== 'undefined' ? -Math.random() * 300 : 0,
            y: typeof window !== 'undefined' ? window.innerHeight + 100 : 800,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            ease: "linear",
            times: [0, 0.2, 0.8, 1],
          }}
        />
      ))}
    </div>
  );
};
