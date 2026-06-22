import { useEffect } from 'react';
import { motion } from 'framer-motion';

const LandingAnimation = ({ onComplete }) => {
  useEffect(() => {
    const t = setTimeout(onComplete, 2800);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-stone-950"
    >
      {/* Gold top line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 w-full h-[3px] bg-gold-gradient origin-left"
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6"
      >
        <img src="/logo.png" alt="Sri Amman Tiles" className="h-16 w-auto object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="font-display text-3xl md:text-4xl text-white tracking-widest text-center"
      >
        SRI AMMAN TILES
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="text-gold-400 text-sm tracking-[0.3em] uppercase mt-3 font-sans"
      >
        Premium Building Materials
      </motion.p>

      {/* Progress bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 2, ease: 'linear' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 h-0.5 bg-gold-gradient origin-left rounded-full"
      />
    </motion.div>
  );
};

export default LandingAnimation;
