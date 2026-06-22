import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, MapPin, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import showroomImg from '../assets/showroom.png';

/* ─── Photo data with grid layout hints ─────────────────────────── */
const shopPhotos = [
  {
    id: 1,
    title: 'Welcome to Sri Amman Tiles',
    caption: 'Our flagship showroom in Melur, Tamil Nadu — Est. 2009',
    image: '/gallery/IMG_1220.png',
    col: 'lg:col-span-2', row: 'lg:row-span-1',
  },
  {
    id: 2,
    title: 'Designer Tile Display Wall',
    caption: 'Hundreds of premium tile designs on display',
    image: '/gallery/MALA0743.jpg',
    col: 'lg:col-span-1', row: 'lg:row-span-1',
  },
  {
    id: 3,
    title: 'Showroom Experience',
    caption: 'Walk on our premium floor tile demonstrations',
    image: '/gallery/MALA0740.jpg',
    col: 'lg:col-span-1', row: 'lg:row-span-1',
  },
  {
    id: 4,
    title: 'Interior Design Displays',
    caption: 'Curated room-setting inspirations',
    image: '/gallery/IMG_4141.png',
    col: 'lg:col-span-1', row: 'lg:row-span-1',
  },
  {
    id: 5,
    title: 'Granite & Stone Gallery',
    caption: 'Full slab displays of natural granite and kota Stones',
    image: '/gallery/MALA0702.jpg',
    col: 'lg:col-span-1', row: 'lg:row-span-1',
  },
  {
    id: 6,
    title: 'Bathroom Inspiration Zone',
    caption: 'Complete bathroom fitting demos',
    image: '/gallery/MALA0709.jpg',
    col: 'lg:col-span-1', row: 'lg:row-span-1',
  },
  {
    id: 7,
    title: 'Luxury Marble Showcase',
    caption: 'Premium Italian and Indian marble collections',
    image: '/gallery/MALA0810.jpg',
    col: 'lg:col-span-1', row: 'lg:row-span-1',
  },
  {
    id: 8,
    title: 'Elegant Bathroom Gallery',
    caption: 'Curated premium bathroom fittings and fixtures',
    image: '/gallery/IMG_1212.png',
    col: 'lg:col-span-1', row: 'lg:row-span-1',
  },
];


/* ─── Photo Card ─────────────────────────────────────────────────── */
const PhotoCard = ({ photo, idx, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 24, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ delay: (idx % 3) * 0.06, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    onClick={() => onClick(photo, idx)}
    className={`group relative overflow-hidden cursor-pointer rounded-[2rem] ${photo.col} ${photo.row}`}
    style={{
      border: '1px solid rgba(255,255,255,0.16)',
      minHeight: '340px',
      background: 'rgba(6,12,28,0.24)',
      backdropFilter: 'blur(14px)',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
    }}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)';
      e.currentTarget.style.boxShadow = '0 24px 80px rgba(39, 107, 255, 0.18)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {/* Image */}
    <img
      src={photo.image}
      alt={photo.title}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
      style={{ minHeight: '220px' }}
    />

    {/* Always-visible bottom gradient + title */}
    <div
      className="absolute inset-0 flex flex-col justify-end p-5"
      style={{ background: 'linear-gradient(to top, rgba(1,6,14,0.88) 0%, rgba(1,6,14,0.30) 45%, transparent 100%)' }}
    >
      {/* Photo number badge */}
      <span
        className="absolute top-4 left-4 text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full"
        style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.22)', color: 'rgba(34,211,238,0.80)' }}
      >
        {String(idx + 1).padStart(2, '0')}
      </span>

      {/* Zoom icon top-right */}
      <div
        className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300"
        style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.30)', color: '#22D3EE' }}
      >
        <ZoomIn size={14} />
      </div>

      {/* Title always visible */}
      <h3
        className="font-display text-sm md:text-base font-semibold leading-snug translate-y-1 group-hover:translate-y-0 transition-transform duration-300"
        style={{ color: '#ffffff' }}
      >
        {photo.title}
      </h3>

      {/* Caption — slides up on hover */}
      <p
        className="text-xs mt-1.5 font-sans opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
        style={{ color: 'rgba(184,214,238,0.65)' }}
      >
        {photo.caption}
      </p>

      {/* Cyan accent line */}
      <div
        className="h-[2px] mt-3 w-0 group-hover:w-10 transition-all duration-500 rounded-full"
        style={{ background: 'linear-gradient(90deg, #22D3EE, #06B6D4)' }}
      />
    </div>
  </motion.div>
);

/* ─── Main Gallery Component ─────────────────────────────────────── */
const Gallery = () => {
  const [selected, setSelected]   = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(null);

  const open  = (photo, idx) => { setSelected(photo); setSelectedIdx(idx); };
  const close = useCallback(() => { setSelected(null); setSelectedIdx(null); }, []);

  const prev = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIdx(i => {
      const next = (i - 1 + shopPhotos.length) % shopPhotos.length;
      setSelected(shopPhotos[next]);
      return next;
    });
  }, []);

  const next = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIdx(i => {
      const next = (i + 1) % shopPhotos.length;
      setSelected(shopPhotos[next]);
      return next;
    });
  }, []);

  /* Keyboard navigation */
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => {
      if (e.key === 'Escape')      close();
      if (e.key === 'ArrowLeft')   prev();
      if (e.key === 'ArrowRight')  next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, prev, next, close]);

  return (
    <div className="min-h-screen" style={{ background: 'rgba(1,8,16,0.88)' }}>

      {/* ── Cinematic Hero ─────────────────────────────────────────── */}
      <div className="relative h-[65vh] min-h-[460px] overflow-hidden">
        <img
          src={showroomImg}
          alt="Sri Amman Tiles Showroom"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 25%', transform: 'scale(1.06)' }}
        />
        {/* Deep overlay */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(165deg, rgba(1,8,16,0.55) 0%, rgba(1,8,16,0.75) 60%, rgba(1,8,16,0.96) 100%)' }} />

        {/* Cyan radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 50%, rgba(6,182,212,0.06) 0%, transparent 70%)' }} />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto left-0 right-0">
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.35em] uppercase mb-5 px-4 py-2 rounded-full"
            style={{ background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(6,182,212,0.22)', color: '#22D3EE' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Step Inside Our World
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-6xl lg:text-7xl mb-3 leading-tight"
            style={{ color: '#ffffff' }}
          >
            Our<br />
            <span style={{
              background: 'linear-gradient(135deg, #C09B52 0%, #E8C97A 50%, #C09B52 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Showroom</span>
          </motion.h1>

          {/* Gold underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-[3px] w-24 mb-6 rounded-full origin-left"
            style={{ background: 'linear-gradient(90deg, #C09B52, #E8C97A)' }}
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-base md:text-lg font-sans max-w-lg leading-relaxed mb-6"
            style={{ color: 'rgba(184,214,238,0.65)' }}
          >
            A premium space crafted to inspire — every corner of our Melur showroom tells a story of quality, trust, and timeless elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 text-sm font-sans"
            style={{ color: 'rgba(184,214,238,0.50)' }}
          >
            <MapPin size={13} style={{ color: '#22D3EE' }} />
            <span>Karungalakudi Rd, Melur, Tamil Nadu 625101</span>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(0deg, rgba(1,8,16,0.58) 0%, transparent 100%)' }} />
      </div>

      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-10 xl:px-14 mt-10">

        {/* ── Glass panel container ─────────────────────────────────── */}
        <div
          className="rounded-[3rem] p-6 md:p-8 lg:p-10 mb-8 relative overflow-hidden backdrop-blur-xl"
          style={{
            background: 'linear-gradient(180deg, rgba(5,12,26,0.94) 0%, rgba(10,18,44,0.95) 100%)',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: '0 26px 120px rgba(0,0,0,0.45)',
          }}
        >
          {/* Cyan top accent line */}
          <div className="absolute top-0 left-0 w-full h-[2px]"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent)' }} />

          {/* ── Section Label ─────────────────────────────────────────── */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px" style={{ background: 'rgba(6,182,212,0.10)' }} />
            <span className="text-[11px] font-bold tracking-[0.35em] uppercase px-4 py-1.5 rounded-full"
              style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.14)', color: 'rgba(34,211,238,0.65)' }}>
              Sri Amman Tiles · Gallery
            </span>
            <div className="flex-1 h-px" style={{ background: 'rgba(6,182,212,0.10)' }} />
          </div>

          {/* ── Editorial Bento Grid ──────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 perspective-wrap auto-rows-[340px]">
            {shopPhotos.map((photo, idx) => (
              <PhotoCard key={photo.id} photo={photo} idx={idx} onClick={open} />
            ))}
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 mb-8 rounded-3xl overflow-hidden relative"
          style={{
            background: 'linear-gradient(135deg, rgba(4,18,40,0.96) 0%, rgba(6,26,58,0.96) 100%)',
            border: '1px solid rgba(6,182,212,0.12)',
            boxShadow: '0 20px 80px rgba(1,8,16,0.6)',
          }}
        >
          {/* Cyan top bar */}
          <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, #06B6D4, #22D3EE, #C09B52, #22D3EE, #06B6D4)' }} />

          {/* Bg glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 110%, rgba(6,182,212,0.06) 0%, transparent 70%)' }} />

          <div className="p-10 md:p-14 flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <span className="text-xs font-bold tracking-[0.3em] uppercase mb-4 block" style={{ color: '#22D3EE' }}>Visit Us In Person</span>
              <h3 className="font-display text-3xl md:text-4xl mb-4" style={{ color: '#ffffff' }}>
                See It. Touch It.<br />
                <span className="text-gold-gradient">Love It.</span>
              </h3>
              <p className="font-sans text-sm md:text-base leading-relaxed max-w-md" style={{ color: 'rgba(184,214,238,0.55)' }}>
                Photos never capture the full experience. Come visit Sri Amman Tiles in Melur and explore 100+ tile designs, granite slabs, and complete building solutions — all under one roof.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 min-w-[200px]">
              <a
                href="https://maps.google.com/?q=Sri+Amman+Tiles+Melur"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center justify-center gap-2"
              >
                <MapPin size={15} />
                Get Directions
              </a>
              <a
                href="tel:+919942379987"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.20)', color: '#22D3EE' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.16)'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.08)'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.20)'; }}
              >
                <Phone size={14} />
                +91 99423 79987
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[200] flex flex-col"
            style={{ background: 'rgba(1,5,12,0.99)' }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 shrink-0" onClick={e => e.stopPropagation()}>
              <div>
                <p className="text-xs font-bold tracking-[0.3em] uppercase mb-0.5" style={{ color: '#22D3EE' }}>
                  Sri Amman Tiles · Showroom
                </p>
                <AnimatePresence mode="wait">
                  <motion.h3
                    key={selected.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="font-display text-lg md:text-xl"
                    style={{ color: '#ffffff' }}
                  >
                    {selected.title}
                  </motion.h3>
                </AnimatePresence>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-3 py-1.5 rounded-full"
                  style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.16)', color: 'rgba(34,211,238,0.60)' }}>
                  {String(selectedIdx + 1).padStart(2, '0')} / {String(shopPhotos.length).padStart(2, '0')}
                </span>
                <button
                  onClick={close}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.7)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'; e.currentTarget.style.color = '#f87171'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Main image area */}
            <div className="flex-1 flex items-center justify-center relative px-16 min-h-0" onClick={e => e.stopPropagation()}>
              {/* Prev */}
              <button
                onClick={prev}
                className="absolute left-4 md:left-6 w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all"
                style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.18)', color: '#22D3EE' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.20)'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.40)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.08)'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.18)'; }}
              >
                <ChevronLeft size={22} />
              </button>

              <AnimatePresence mode="wait">
                <motion.img
                  key={selected.id}
                  src={selected.image}
                  alt={selected.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-full max-h-full object-contain rounded-2xl"
                  style={{ boxShadow: '0 0 100px rgba(6,182,212,0.08)', maxHeight: 'calc(100vh - 240px)' }}
                />
              </AnimatePresence>

              {/* Next */}
              <button
                onClick={next}
                className="absolute right-4 md:right-6 w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all"
                style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.18)', color: '#22D3EE' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.20)'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.40)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.08)'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.18)'; }}
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Caption */}
            <div className="text-center py-3 shrink-0" onClick={e => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={selected.id + '-cap'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm font-sans"
                  style={{ color: 'rgba(184,214,238,0.45)' }}
                >
                  {selected.caption}
                </motion.p>
              </AnimatePresence>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.15)' }}>
                ← → arrow keys to navigate · Esc to close
              </p>
            </div>

            {/* Filmstrip thumbnails */}
            <div
              className="flex gap-2 justify-center px-6 pb-5 shrink-0 overflow-x-auto"
              style={{ scrollbarWidth: 'none' }}
              onClick={e => e.stopPropagation()}
            >
              {shopPhotos.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => { setSelected(p); setSelectedIdx(i); }}
                  className="shrink-0 rounded-lg overflow-hidden transition-all duration-200"
                  style={{
                    width: '52px', height: '40px',
                    border: i === selectedIdx
                      ? '2px solid #22D3EE'
                      : '2px solid rgba(255,255,255,0.08)',
                    opacity: i === selectedIdx ? 1 : 0.45,
                    transform: i === selectedIdx ? 'scale(1.10)' : 'scale(1)',
                    boxShadow: i === selectedIdx ? '0 0 12px rgba(6,182,212,0.40)' : 'none',
                  }}
                >
                  <img src={p.image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
