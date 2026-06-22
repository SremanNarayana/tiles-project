import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Star, Sparkles } from 'lucide-react';
import { scrollTo } from '../hooks/useLenis';

/* Rising bubble particle */
const Bubble = ({ size, x, delay, duration }) => (
  <motion.div
    animate={{ y: [0, -200], opacity: [0, 0.6, 0], scale: [0.5, 1, 0.7] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    style={{
      position: 'absolute',
      left: x,
      bottom: '18%',
      width: size,
      height: size,
      borderRadius: '50%',
      border: '1px solid rgba(6,182,212,0.45)',
      background: 'rgba(6,182,212,0.06)',
      pointerEvents: 'none',
      zIndex: 5,
    }}
  />
);

const Web3Hero = ({ setActivePage }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  /* Content fades & rises as user scrolls */
  const contentOp = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const contentY  = useTransform(scrollYProgress, [0, 0.45], ['0px', '-60px']);
  const statsOp   = useTransform(scrollYProgress, [0, 0.22], [1, 0]);

  const goGallery = () => { setActivePage('gallery'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const goContact = () => scrollTo('#contact');
  const goDown    = () => scrollTo(window.innerHeight);

  return (
    <section
      ref={ref}
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
      style={{ background: 'transparent', zIndex: 1 }}
    >
      {/* Very subtle dark vignette so text stays readable over the ocean */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 80% at 50% 40%, rgba(1,8,16,0.10) 0%, rgba(1,8,16,0.55) 100%)',
          zIndex: 2,
        }}
      />
      {/* Subtle top darken so navbar area is readable */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(1,8,16,0.65) 0%, transparent 100%)', zIndex: 2 }}
      />

      {/* Rising bubbles — kept minimal for performance */}
      <Bubble size={12} x="8%"  delay={0}   duration={5} />
      <Bubble size={10} x="72%" delay={1.5} duration={6} />
      <Bubble size={8}  x="45%" delay={2.8} duration={5.5} />

      {/* ── Hero content ── */}
      <motion.div
        style={{ opacity: contentOp, y: contentY, zIndex: 10 }}
        className="relative h-full flex flex-col items-center justify-center text-center px-5 will-change-transform pb-16"
      >
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 rounded-full px-4 py-2 mb-5 md:mb-8"
          style={{
            background: 'rgba(6,182,212,0.10)',
            border: '1px solid rgba(6,182,212,0.30)',
          }}
        >
          <Sparkles size={11} style={{ color: '#22D3EE' }} />
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-gold-400 fill-gold-400" />)}
          </div>
          <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(184,214,238,0.85)' }}>
            No. 1 Tiles Showroom in Melur
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50, scale: 0.93 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.07] mb-3 md:mb-6 max-w-5xl tracking-tight"
          style={{ color: '#ffffff', textShadow: '0 4px 32px rgba(1,8,16,0.8)' }}
        >
          Step Inside
          <br />
          <span className="text-gold-gradient italic">Your Dream Space</span>
        </motion.h1>

        {/* Subheading — desktop */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="hidden sm:block text-base md:text-xl font-serif max-w-lg mb-8 md:mb-12 leading-relaxed"
          style={{ color: 'rgba(184,214,238,0.72)', textShadow: '0 2px 12px rgba(1,8,16,0.7)' }}
        >
          Melur's most trusted showroom for premium tiles, granite & building materials.
          Serving 5,000+ happy customers for 15+ years.
        </motion.p>

        {/* Mobile tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="sm:hidden text-sm font-serif mb-7 leading-relaxed"
          style={{ color: 'rgba(184,214,238,0.60)' }}
        >
          Premium tiles & building materials · Melur
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center gap-3 md:gap-4"
        >
          <motion.button
            onClick={goGallery}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="btn-gold text-sm md:text-base px-8 md:px-10 py-3.5 md:py-4"
          >
            Explore Collection <ArrowRight size={16} />
          </motion.button>

          <motion.button
            onClick={goContact}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 md:px-10 py-3.5 md:py-4 rounded-full text-sm md:text-base font-semibold transition-all duration-300"
            style={{
              border: '1px solid rgba(6,182,212,0.38)',
              color: 'rgba(184,214,238,0.88)',
              background: 'rgba(6,182,212,0.07)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(6,182,212,0.70)'; e.currentTarget.style.background = 'rgba(6,182,212,0.14)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(6,182,212,0.38)'; e.currentTarget.style.background = 'rgba(6,182,212,0.07)'; e.currentTarget.style.color = 'rgba(184,214,238,0.88)'; }}
          >
            Visit Showroom
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        style={{ opacity: statsOp, zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="absolute bottom-20 sm:bottom-22 left-1/2 -translate-x-1/2 flex items-center gap-7 sm:gap-12 md:gap-20"
      >
        {[
          { num: '15+',    label: 'Years' },
          { num: '100+',   label: 'Designs' },
          { num: '5,000+', label: 'Clients' },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 + i * 0.12 }}
            className="text-center"
          >
            <div
              className="text-xl sm:text-2xl md:text-3xl font-display font-bold"
              style={{ color: '#E8C97A', textShadow: '0 2px 16px rgba(192,155,82,0.4)' }}
            >
              {s.num}
            </div>
            <div className="text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-0.5" style={{ color: 'rgba(6,182,212,0.65)' }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={goDown}
        style={{ opacity: statsOp, zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[10px] tracking-[0.28em] uppercase font-medium" style={{ color: 'rgba(6,182,212,0.55)' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'rgba(6,182,212,0.55)' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Web3Hero;
