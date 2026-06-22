import { useState, useMemo, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Search, X, SlidersHorizontal, Phone,
  CheckCircle2, AlertCircle, Star, Grid3x3, Mountain,
  Bath, Zap, Droplets, Wrench, ChevronDown, MessageCircle,
  ChevronLeft, ChevronRight, ZoomIn,
} from 'lucide-react';
import { getCategoryBySlug, searchProducts } from '../data/products';

/* ─── Icon map ───────────────────────────────────────────────────── */
const ICON_MAP = { Grid3x3, Mountain, Bath, Zap, Droplets, Wrench };

/* ─── Product Detail Modal ───────────────────────────────────────── */
const ProductModal = ({ product, accentColor, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  const views = product.images?.length ? product.images : [product.image];
  const [activeView, setActiveView] = useState(0);

  useEffect(() => { setActiveView(0); }, [product]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setActiveView(v => Math.max(0, v - 1));
      if (e.key === 'ArrowRight') setActiveView(v => Math.min(views.length - 1, v + 1));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, views.length]);

  const sideViews = views.filter((_, i) => i !== activeView);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(1,8,16,0.97)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          maxWidth: '820px',
          border: `1px solid ${accentColor}28`,
          boxShadow: `0 40px 120px rgba(1,8,16,0.98), 0 0 80px ${accentColor}10`,
          background: 'rgba(3,12,28,0.98)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all"
          style={{ background: 'rgba(1,8,16,0.90)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.70)' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.35)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(1,8,16,0.80)'; e.currentTarget.style.color = 'rgba(255,255,255,0.70)'; }}
        >
          <X size={14} />
        </button>

        {/* ── Gallery layout ── */}
        <div className="flex gap-1.5 p-1.5" style={{ minHeight: '420px', maxHeight: '80vh' }}>

          {/* Main large image */}
          <div className="relative flex-1 rounded-xl overflow-hidden bg-[#020c1b]" style={{ minWidth: 0 }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeView}
                src={views[activeView]}
                alt={`${product.name} view ${activeView + 1}`}
                className="w-full h-full object-contain"
                style={{ minHeight: '380px', maxHeight: '75vh' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              />
            </AnimatePresence>
            {/* View counter pill */}
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider"
              style={{ background: 'rgba(1,8,16,0.90)', color: `${accentColor}CC`, border: `1px solid ${accentColor}20` }}>
              {activeView + 1} / {views.length}
            </div>
          </div>

          {/* Side thumbnail column */}
          {views.length > 1 && (
            <div className="flex flex-col gap-1.5" style={{ width: '130px', flexShrink: 0 }}>
              {views.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveView(i)}
                  className="relative overflow-hidden rounded-xl transition-all duration-200"
                  style={{
                    flex: 1,
                    minHeight: '80px',
                    border: activeView === i
                      ? `2px solid ${accentColor}`
                      : '2px solid rgba(255,255,255,0.05)',
                    boxShadow: activeView === i ? `0 0 20px ${accentColor}45` : 'none',
                    opacity: activeView === i ? 1 : 0.50,
                    transform: activeView === i ? 'scale(1.02)' : 'scale(1)',
                  }}
                >
                  <img src={src} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  {activeView === i && (
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ boxShadow: `inset 0 0 0 2px ${accentColor}60` }} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Product-level prev / next */}
      {hasPrev && (
        <button
          onClick={e => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full hidden md:flex items-center justify-center transition-all"
          style={{ background: 'rgba(4,14,35,0.80)', border: `1px solid ${accentColor}25`, color: 'rgba(184,214,238,0.55)' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = `${accentColor}60`; e.currentTarget.style.color = accentColor; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = `${accentColor}25`; e.currentTarget.style.color = 'rgba(184,214,238,0.55)'; }}
        >
          <ChevronLeft size={20} />
        </button>
      )}
      {hasNext && (
        <button
          onClick={e => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full hidden md:flex items-center justify-center transition-all"
          style={{ background: 'rgba(4,14,35,0.80)', border: `1px solid ${accentColor}25`, color: 'rgba(184,214,238,0.55)' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = `${accentColor}60`; e.currentTarget.style.color = accentColor; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = `${accentColor}25`; e.currentTarget.style.color = 'rgba(184,214,238,0.55)'; }}
        >
          <ChevronRight size={20} />
        </button>
      )}
    </motion.div>
  );
};

/* ─── Product Card ───────────────────────────────────────────────── */
const ProductCard = ({ product, accentColor, idx, onClick }) => {
  const [imgErr, setImgErr] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: Math.min(idx * 0.04, 0.4), duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(4,18,40,0.95)',
        border: '1px solid rgba(6,182,212,0.10)',
        transition: 'border-color 0.25s, box-shadow 0.25s',
      }}
      onClick={onClick}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${accentColor}55`;
        e.currentTarget.style.boxShadow = `0 8px 40px ${accentColor}18`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(6,182,212,0.10)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#020c1b]">
        { !imgErr ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
            style={{ imageRendering: 'crisp-edges', transform: 'translateZ(0)' }}
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Grid3x3 size={40} style={{ color: 'rgba(6,182,212,0.20)' }} />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,18,40,0.7) 0%, transparent 60%)' }} />

        {/* View detail hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(1,8,16,0.35)' }}>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(4,14,35,0.95)', border: `1px solid ${accentColor}40`, color: accentColor }}>
            <ZoomIn size={12} /> View Details
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isPopular && (
            <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full"
              style={{ background: 'linear-gradient(135deg,#C09B52,#E8C97A)', color: '#020C1B' }}>
              <Star size={9} strokeWidth={2.5} fill="currentColor" /> Popular
            </span>
          )}
        </div>

        {/* Stock badge */}
        <div className="absolute top-3 right-3">
          {product.inStock ? (
            <span className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.30)', color: '#34D399' }}>
              <CheckCircle2 size={9} /> In Stock
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.25)', color: '#f87171' }}>
              <AlertCircle size={9} /> Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5">
        {/* Subcategory + Brand */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.14)', color: 'rgba(34,211,238,0.70)' }}>
            {product.subcategory}
          </span>
          <span className="text-[10px] font-sans" style={{ color: 'rgba(184,214,238,0.35)' }}>{product.brand}</span>
        </div>

        {/* Product name */}
        <h3 className="font-display text-base md:text-lg leading-snug mb-3" style={{ color: '#ffffff' }}>
          {product.name}
        </h3>

        {/* Features pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.features.slice(0, 2).map((f, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full font-sans"
              style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.10)', color: 'rgba(184,214,238,0.50)' }}>
              {f}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-end pt-3"
          style={{ borderTop: '1px solid rgba(6,182,212,0.08)' }}>
          <a
            href="tel:+919942379987"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
            style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.18)', color: '#22D3EE' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.18)'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.40)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.08)'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.18)'; }}
          >
            <Phone size={11} /> Enquire
          </a>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Empty State ─────────────────────────────────────────────────── */
const EmptyState = ({ query, onClear }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="col-span-full flex flex-col items-center justify-center py-24 text-center"
  >
    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
      style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.12)' }}>
      <Search size={32} style={{ color: 'rgba(6,182,212,0.30)' }} />
    </div>
    <h3 className="font-display text-xl mb-2" style={{ color: '#ffffff' }}>No Products Found</h3>
    <p className="text-sm font-sans mb-6 max-w-sm" style={{ color: 'rgba(184,214,238,0.45)' }}>
      {query
        ? `No results for "${query}". Try a different search term or clear the filters.`
        : 'No products available in this filter. Try selecting a different subcategory.'}
    </p>
    <button
      onClick={onClear}
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
      style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.20)', color: '#22D3EE' }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.16)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.08)'; }}
    >
      <X size={14} /> Clear Filters
    </button>
  </motion.div>
);

/* ─── Main Page ──────────────────────────────────────────────────── */
const CategoryPage = () => {
  const { slug } = useParams();
  const navigate  = useNavigate();

  const category = useMemo(() => getCategoryBySlug(slug), [slug]);

  const [query,        setQuery]        = useState('');
  const [subcat,       setSubcat]       = useState('All');
  const [sortBy,       setSortBy]       = useState('popular');
  const [showFilters,  setShowFilters]  = useState(false);
  const [selectedIdx,  setSelectedIdx]  = useState(null);

  /* Reset filters when slug changes */
  useEffect(() => { setQuery(''); setSubcat('All'); setSortBy('popular'); setSelectedIdx(null); }, [slug]);

  /* Scroll to top on mount */
  useEffect(() => { window.scrollTo({ top: 0 }); }, [slug]);

  /* Lock body scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = selectedIdx !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedIdx]);

  const products = useMemo(
    () => searchProducts(slug, query, subcat, sortBy),
    [slug, query, subcat, sortBy]
  );

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-5"
        style={{ background: 'rgba(1,8,16,0.97)' }}>
        <h2 className="font-display text-3xl mb-4" style={{ color: '#ffffff' }}>Category Not Found</h2>
        <p className="mb-8 font-sans text-sm" style={{ color: 'rgba(184,214,238,0.50)' }}>
          The category "{slug}" doesn't exist yet.
        </p>
        <button onClick={() => navigate('/')} className="btn-gold inline-flex gap-2">
          <ArrowLeft size={15} /> Back to Home
        </button>
      </div>
    );
  }

  const Icon = ICON_MAP[category.iconName] || Grid3x3;

  return (
    <div className="min-h-screen" style={{ background: 'rgba(1,8,16,0.96)' }}>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="relative h-[46vh] min-h-[320px] overflow-hidden">
        <img src={category.heroImage} alt={category.label}
          className="w-full h-full object-cover" style={{ objectPosition: 'center 40%', transform: 'scale(1.05)' }} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, rgba(1,8,16,0.50) 0%, rgba(1,8,16,0.80) 60%, rgba(1,8,16,0.97) 100%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 70% at 20% 50%, ${category.accentColor}0d 0%, transparent 65%)` }} />

        <div className="absolute inset-0 flex flex-col justify-end pb-10 px-5 md:px-10 lg:px-16 max-w-7xl mx-auto left-0 right-0">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="flex items-center gap-2 text-xs font-sans mb-4" style={{ color: 'rgba(184,214,238,0.40)' }}>
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Home</button>
            <span>/</span>
            <button onClick={() => { navigate('/'); setTimeout(() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }), 300); }}
              className="hover:text-white transition-colors">Products</button>
            <span>/</span>
            <span style={{ color: category.accentColor }}>{category.label}</span>
          </motion.div>

          <div className="flex items-end gap-5">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, type: 'spring', stiffness: 260 }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: `${category.accentColor}15`, border: `1px solid ${category.accentColor}30`, boxShadow: `0 0 24px ${category.accentColor}20` }}>
              <Icon size={26} style={{ color: category.accentColor }} strokeWidth={1.5} />
            </motion.div>
            <div>
              <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="text-xs font-bold tracking-[0.3em] uppercase block mb-1.5" style={{ color: category.accentColor }}>
                Sri Amman Tiles
              </motion.span>
              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl md:text-5xl" style={{ color: '#ffffff' }}>
                {category.label}
              </motion.h1>
            </div>
          </div>

          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="mt-4 text-sm md:text-base font-sans max-w-2xl leading-relaxed" style={{ color: 'rgba(184,214,238,0.60)' }}>
            {category.description}
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(0deg, rgba(1,8,16,0.60) 0%, transparent 100%)' }} />
      </div>

      {/* ── Controls ─────────────────────────────────────────────── */}
      <div className=""
        style={{ borderBottom: '1px solid rgba(6,182,212,0.08)' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 py-3">

          {/* Back */}
          <button onClick={() => navigate(-1)}
            className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all"
            style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.14)', color: 'rgba(34,211,238,0.70)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.14)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.06)'; }}>
            <ArrowLeft size={16} />
          </button>

        </div>
      </div>

      {/* ── Product Grid ──────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 py-10">

        {/* Result count mobile */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <span className="text-xs font-sans" style={{ color: 'rgba(184,214,238,0.35)' }}>
            {products.length} product{products.length !== 1 ? 's' : ''}
          </span>
          {(query || subcat !== 'All') && (
            <button onClick={() => { setQuery(''); setSubcat('All'); }}
              className="text-xs flex items-center gap-1" style={{ color: '#22D3EE' }}>
              <X size={11} /> Clear
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {products.length === 0 ? (
            <EmptyState key="empty" query={query} onClear={() => { setQuery(''); setSubcat('All'); }} />
          ) : (
            <motion.div
              key={`${slug}-${subcat}-${query}-${sortBy}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {products.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  accentColor={category.accentColor}
                  idx={i}
                  onClick={() => setSelectedIdx(i)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-5 md:gap-10 relative overflow-hidden"
          style={{ background: 'rgba(4,18,40,0.85)', border: '1px solid rgba(6,182,212,0.10)', boxShadow: '0 8px 40px rgba(1,8,16,0.5)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${category.accentColor}60, transparent)` }} />

          <div className="flex-1 text-center md:text-left">
            <h3 className="font-display text-xl md:text-2xl mb-1" style={{ color: '#ffffff' }}>
              Can't find what you need?
            </h3>
            <p className="text-sm font-sans" style={{ color: 'rgba(184,214,238,0.50)' }}>
              Call or WhatsApp us — we stock many more products at our Melur showroom.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href="tel:+919942379987"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.20)', color: '#22D3EE' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.18)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.08)'; }}>
              <Phone size={14} /> Call Us
            </a>
            <a href="https://wa.me/919942379987?text=Hi%2C%20I%20need%20help%20with%20your%20products"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: 'rgba(37,211,102,0.10)', border: '1px solid rgba(37,211,102,0.25)', color: '#25D366' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.20)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.10)'; }}>
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── Product Detail Modal (portal to escape Framer scale context) ── */}
      {createPortal(
        <AnimatePresence>
          {selectedIdx !== null && products[selectedIdx] && (
            <ProductModal
              key={products[selectedIdx].id}
              product={products[selectedIdx]}
              accentColor={category.accentColor}
              onClose={() => setSelectedIdx(null)}
              onPrev={() => setSelectedIdx(i => Math.max(0, i - 1))}
              onNext={() => setSelectedIdx(i => Math.min(products.length - 1, i + 1))}
              hasPrev={selectedIdx > 0}
              hasNext={selectedIdx < products.length - 1}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default CategoryPage;
