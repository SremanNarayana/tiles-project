import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Grid3x3, Mountain, Bath, Zap, Droplets, Wrench, ArrowRight, ChevronRight,
} from 'lucide-react';
import ScrollReveal3D from './ScrollReveal3D';
import TiltCard from './TiltCard';
import tilesMosaic  from '../assets/tiles-mosaic.png';
import graniteImg   from '../assets/granite-levels.jpg';
import sanitaryImg  from '../assets/sanitary-ware.webp';

const CATEGORIES = [
  {
    slug: 'tiles',
    label: 'Tiles',
    icon: Grid3x3,
    desc: 'Floor, Wall & Designer Tiles',
    img: tilesMosaic,
    count: '8 products',
    accent: '#22D3EE',
  },
  {
    slug: 'granite-kota Stones',
    label: 'Granite & Kota Stones',
    icon: Mountain,
    desc: 'Natural Stone Slabs',
    img: graniteImg,
    count: '6 products',
    accent: '#E8C97A',
  },
  {
    slug: 'sanitary-ware',
    label: 'Sanitary Ware',
    icon: Bath,
    desc: 'Premium Bathroom Fittings',
    img: sanitaryImg,
    count: '7 products',
    accent: '#22D3EE',
  },
  {
    slug: 'accessories',
    label: 'Accessories',
    icon: Wrench,
    desc: 'Grouts, Adhesives & Waterproofing',
    img: '/products/accessories-card.jpg',
    count: '6 products',
    accent: '#A78BFA',
  },
];

const CategoryCard = ({ cat, index, onClick }) => (
  <TiltCard intensity={7} lift={10}>
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay: (index % 3) * 0.07 + Math.floor(index / 3) * 0.05,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={() => onClick(cat.slug)}
      className="group ocean-card cursor-pointer relative overflow-hidden"
      style={{ borderRadius: '1rem' }}
      whileHover={{ y: -3 }}
    >
      {/* Image */}
      <div className="h-44 overflow-hidden relative">
        <img
          src={cat.img}
          alt={cat.label}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ objectPosition: 'center center' }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(2,12,27,0.85) 0%, rgba(2,12,27,0.2) 60%, transparent 100%)' }} />

        {/* Product count badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider"
          style={{ background: 'rgba(1,8,16,0.92)', border: `1px solid ${cat.accent}30`, color: cat.accent }}>
          {cat.count}
        </div>

        {/* Arrow badge on hover */}
        <div
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          style={{ background: 'linear-gradient(135deg, #C09B52, #E8C97A)', boxShadow: '0 4px 16px rgba(192,155,82,0.40)' }}
        >
          <ArrowRight size={14} style={{ color: '#020C1B' }} />
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
          style={{ background: `${cat.accent}12`, border: `1px solid ${cat.accent}22` }}
        >
          <cat.icon size={18} strokeWidth={1.5} style={{ color: cat.accent }} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm md:text-base truncate" style={{ color: '#ffffff' }}>
            {cat.label}
          </h3>
          <p className="text-xs mt-0.5 font-sans truncate" style={{ color: 'rgba(6,182,212,0.50)' }}>
            {cat.desc}
          </p>
        </div>
        <ChevronRight size={15} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 duration-200"
          style={{ color: cat.accent }} />
      </div>

      {/* Accent bottom sweep */}
      <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-out"
        style={{ background: `linear-gradient(90deg, ${cat.accent}, ${cat.accent}80, ${cat.accent})` }} />
    </motion.div>
  </TiltCard>
);

const Products = () => {
  const navigate = useNavigate();

  return (
    <section
      id="products"
      className="section-spacing relative overflow-hidden"
      style={{ background: 'rgba(1,8,16,0.72)' }}
    >
      {/* Depth lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 70%)' }} />

      {/* Floating bubbles */}
      <div className="absolute top-20 right-10 w-3 h-3 rounded-full border border-cyan-400/20 animate-bubble pointer-events-none" />
      <div className="absolute bottom-20 left-8 w-4 h-4 rounded-full border border-gold-400/15 animate-bubble-alt pointer-events-none" />
      <div className="absolute top-1/2 left-5 w-2 h-2 rounded-full bg-cyan-400/10 animate-bubble pointer-events-none" style={{ animationDelay: '1s' }} />

      <div className="glass-card max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">

        {/* Header */}
        <ScrollReveal3D direction="up">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
            <div>
              <span className="section-label">What We Offer</span>
              <h2 className="section-title mt-2">Our Product Range</h2>
              <p className="text-sm font-sans mt-3 max-w-md" style={{ color: 'rgba(184,214,238,0.50)' }}>
                Click any category to explore all products with filters, search, and pricing.
              </p>
            </div>
            <div className="cyan-line sm:mb-2" />
          </div>
        </ScrollReveal3D>

        {/* Grid — 4 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 perspective-wrap">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard
              key={cat.slug}
              cat={cat}
              index={i}
              onClick={(slug) => navigate(`/categories/${slug}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
