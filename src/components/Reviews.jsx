import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import ScrollReveal3D from './ScrollReveal3D';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const fallbackReviews = [
  { name: 'Thavasimuthu',       initials: 'T',  rating: 5, color: '#1A4480',    text: 'Amazing collection of tiles! Absolutely loved the showroom experience. The variety and quality are unmatched in this region.' },
  { name: 'K. Subreem Khan',    initials: 'KS', rating: 5, color: '#0E7490',    text: 'Customer support and staff performance is super. Very helpful and knowledgeable team. Highly recommended!' },
  { name: 'Sri Amman Granites', initials: 'SG', rating: 5, color: '#6D28D9',    text: 'Well experienced staff guided me to pick the perfect granite for my home. Excellent service and great prices.' },
  { name: 'Ramesh Kumar',       initials: 'RK', rating: 5, color: '#A67C35',    text: 'Best tiles collection in Melur. Great prices and excellent quality. Will definitely visit again for my next project!' },
];

const avatarColors = ['#1A4480', '#0E7490', '#6D28D9', '#A67C35', '#047857', '#B45309'];

const getInitials = (name) => (
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'R'
);

const formatApiReview = (review, index) => ({
  name: review.username,
  initials: getInitials(review.username),
  rating: review.rating,
  color: avatarColors[index % avatarColors.length],
  text: review.comment || 'Thank you for sharing your rating with us.',
});

const StarRating = ({ count }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < count ? 'text-gold-400 fill-gold-400' : ''}
        style={i < count ? undefined : { color: 'rgba(6,182,212,0.18)', fill: 'rgba(6,182,212,0.08)' }}
      />
    ))}
  </div>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const Reviews = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [apiReviews, setApiReviews] = useState([]);

  const displayReviews = apiReviews.length > 0 ? apiReviews : fallbackReviews;

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/reviews`);

        if (!response.ok) {
          throw new Error('Failed to load reviews');
        }

        const data = await response.json();
        const loadedReviews = Array.isArray(data.reviews)
          ? data.reviews.map(formatApiReview)
          : [];

        setApiReviews(loadedReviews);
        setCurrent((prev) => Math.min(prev, Math.max(loadedReviews.length - 1, 0)));
      } catch {
        setApiReviews([]);
      }
    };

    loadReviews();
    window.addEventListener('reviews:updated', loadReviews);

    return () => window.removeEventListener('reviews:updated', loadReviews);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go(1), 6000);
    return () => clearInterval(t);
  }, [current, displayReviews.length]);

  const go = (dir) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + displayReviews.length) % displayReviews.length);
  };

  const variants = {
    enter:  (d) => ({ opacity: 0, x: d > 0 ? 80 : -80, rotateY: d > 0 ? 12 : -12, scale: 0.93 }),
    center: { opacity: 1, x: 0, rotateY: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    exit:   (d) => ({ opacity: 0, x: d > 0 ? -80 : 80, rotateY: d > 0 ? -8 : 8, scale: 0.94, transition: { duration: 0.35 } }),
  };

  const r = displayReviews[current] || fallbackReviews[0];

  return (
    <section
      className="section-spacing relative overflow-hidden"
      style={{ background: 'rgba(2,10,22,0.72)' }}
    >
      {/* Depth glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 70%)' }} />

      {/* Bubbles */}
      <div className="absolute top-16 left-10 w-3 h-3 rounded-full border border-cyan-400/18 animate-bubble pointer-events-none" />
      <div className="absolute bottom-20 right-12 w-4 h-4 rounded-full border border-gold-400/12 animate-bubble-alt pointer-events-none" />

      <div className="glass-card max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">

        {/* Header */}
        <ScrollReveal3D direction="up">
          <div className="text-center mb-16">
            <span className="section-label">Testimonials</span>
            <h2 className="section-title mt-3 mb-4">What Our Customers Say</h2>
            <div className="cyan-line mx-auto" />
          </div>
        </ScrollReveal3D>

        {/* Card */}
        <div className="relative min-h-[270px] flex items-center" style={{ perspective: '1200px' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ transformPerspective: 1200, willChange: 'transform, opacity' }}
              className="w-full"
            >
              <div
                className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start relative overflow-hidden"
                style={{
                  background: 'rgba(4,18,40,0.95)',
                  border: '1px solid rgba(6,182,212,0.12)',
                  boxShadow: '0 8px 48px rgba(1,8,16,0.6)',
                }}
              >
                {/* Cyan top shimmer */}
                <div className="absolute top-0 left-12 right-12 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.35), transparent)' }} />

                {/* Avatar */}
                <div className="flex flex-col items-center text-center md:w-40 shrink-0">
                  <motion.div
                    initial={{ scale: 0.5, rotateY: -20 }}
                    animate={{ scale: 1, rotateY: 0 }}
                    transition={{ delay: 0.2, type: 'spring', damping: 14 }}
                    style={{ transformPerspective: 600, background: r.color, boxShadow: `0 4px 20px ${r.color}55` }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-display text-xl font-bold mb-4"
                  >
                    {r.initials}
                  </motion.div>
                  <h4 className="font-semibold text-sm mb-1.5" style={{ color: '#ffffff' }}>{r.name}</h4>
                  <StarRating count={r.rating} />
                </div>

                {/* Divider */}
                <div className="hidden md:block w-px self-stretch" style={{ background: 'rgba(6,182,212,0.12)' }} />

                {/* Text */}
                <div className="flex-1">
                  <Quote size={32} className="mb-4" style={{ color: 'rgba(6,182,212,0.25)' }} />
                  <p className="text-lg font-serif leading-relaxed italic" style={{ color: 'rgba(184,214,238,0.80)' }}>"{r.text}"</p>
                  <div className="mt-5 flex items-center gap-2">
                    <GoogleIcon />
                    <span className="text-xs font-medium" style={{ color: 'rgba(6,182,212,0.5)' }}>Google Review</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-5 mt-8">
          <motion.button
            onClick={() => go(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ border: '1px solid rgba(6,182,212,0.18)', color: 'rgba(6,182,212,0.6)', background: 'rgba(6,182,212,0.04)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(6,182,212,0.45)'; e.currentTarget.style.color = '#22D3EE'; e.currentTarget.style.background = 'rgba(6,182,212,0.10)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(6,182,212,0.18)'; e.currentTarget.style.color = 'rgba(6,182,212,0.6)'; e.currentTarget.style.background = 'rgba(6,182,212,0.04)'; }}
          >
            <ChevronLeft size={18} />
          </motion.button>

          <div className="flex gap-2">
            {displayReviews.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                animate={{
                  width: i === current ? 24 : 8,
                  backgroundColor: i === current ? '#22D3EE' : 'rgba(6,182,212,0.20)',
                }}
                className="h-2 rounded-full"
              />
            ))}
          </div>

          <motion.button
            onClick={() => go(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
            style={{ border: '1px solid rgba(6,182,212,0.18)', color: 'rgba(6,182,212,0.6)', background: 'rgba(6,182,212,0.04)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(6,182,212,0.45)'; e.currentTarget.style.color = '#22D3EE'; e.currentTarget.style.background = 'rgba(6,182,212,0.10)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(6,182,212,0.18)'; e.currentTarget.style.color = 'rgba(6,182,212,0.6)'; e.currentTarget.style.background = 'rgba(6,182,212,0.04)'; }}
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
