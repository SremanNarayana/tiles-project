import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal3D from './ScrollReveal3D';
import TiltCard from './TiltCard';

const tilesBrands = [
  { name: 'Kajaria Ceramics', logo: '/logos/kajaria.png' },
  { name: 'Somany Ceramics',  logo: '/logos/somany.png' },
  { name: 'H & R Johnson',    logo: '/logos/hrjohnson.png' },
  { name: 'AGL Tiles',        logo: '/logos/agl.png' },
  { name: 'RAK Ceramics',     logo: '/logos/rak.png' },
  { name: 'Varmora',          logo: '/logos/varmora.png' },
  { name: 'Parryware',        logo: '/logos/parryware.png' },
  { name: 'Harsha Tiles',     logo: '/logos/harsha.png' },
  { name: 'Itaca',            logo: '/logos/itaca.png' },
  { name: 'Italake',          logo: '/logos/italake.png' },
  { name: 'Sun Core Tiles',   logo: '/logos/suncore.png' },
  { name: 'Millennium',       logo: '/logos/millennium.png' },
  { name: 'Silk Touch',       logo: '/logos/silktouch.png' },
  { name: 'Pupa',             logo: '/logos/pupa.png' },
  { name: 'QUTONE',           logo: '/logos/qutone.png' },
  { name: 'NITCO',            logo: '/logos/nitco.png' },
];

const applianceBrands = [
  { name: 'Franke',  logo: '/logos/franke.png' },
  { name: 'Faber',   logo: '/logos/faber.png' },
  { name: 'Faldu',   logo: '/logos/faldu.png' },
  { name: 'Kerovit', logo: '/logos/kerovit.png' },
];

const BrandCard = ({ name, logo, index }) => {
  const [err, setErr] = useState(false);
  return (
    <TiltCard intensity={12} lift={6}>
      <motion.div
        initial={{ opacity: 0, scale: 0.75, y: 24 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="group rounded-xl h-20 overflow-hidden transition-all duration-300 cursor-pointer"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
          e.currentTarget.style.borderColor = 'rgba(6,182,212,0.18)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        }}
      >
        {!err && logo ? (
          <img
            src={logo}
            alt={`${name} Logo`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
            onError={() => setErr(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-bold text-xs tracking-wide text-center px-2" style={{ color: 'rgba(184,214,238,0.75)' }}>{name}</span>
          </div>
        )}
      </motion.div>
    </TiltCard>
  );
};

const SectionDivider = ({ title }) => (
  <div className="flex items-center gap-5 mb-8">
    <div className="w-8 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, #06B6D4, #22D3EE)' }} />
    <h3 className="font-display text-xl whitespace-nowrap" style={{ color: 'rgba(184,214,238,0.85)' }}>{title}</h3>
    <div className="flex-1 h-px" style={{ background: 'rgba(6,182,212,0.12)' }} />
  </div>
);

const Brands = () => (
  <section
    id="brands"
    className="section-spacing relative overflow-hidden"
    style={{ background: 'rgba(2,10,22,0.72)' }}
  >
    {/* Depth glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] rounded-full blur-[120px] pointer-events-none"
      style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 70%)' }} />

    {/* Bubbles */}
    <div className="absolute top-12 left-12 w-3 h-3 rounded-full border border-cyan-400/18 animate-bubble pointer-events-none" />
    <div className="absolute bottom-16 right-10 w-4 h-4 rounded-full border border-gold-400/12 animate-bubble-alt pointer-events-none" />

    <div className="glass-card max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">

      {/* Header */}
      <ScrollReveal3D direction="up">
        <div className="text-center mb-16">
          <span className="section-label">Our Network</span>
          <h2 className="section-title mt-3 mb-4">Trusted Brands & Partnerships</h2>
          <div className="cyan-line mx-auto mb-5" />
          <p className="section-subtitle max-w-2xl mx-auto">
            Authorised dealers of India's leading national and international brands — ensuring premium quality,
            durability, and performance for every project.
          </p>
        </div>
      </ScrollReveal3D>

      {/* Tiles brands */}
      <ScrollReveal3D direction="up" delay={0.1}>
        <div className="mb-12">
          <SectionDivider title="Tiles & Sanitary Brands" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 perspective-wrap">
            {tilesBrands.map((b, i) => (
              <BrandCard key={i} {...b} index={i} />
            ))}
          </div>
        </div>
      </ScrollReveal3D>

      {/* Appliance brands */}
      <ScrollReveal3D direction="up" delay={0.15}>
        <div>
          <SectionDivider title="Home Appliances Brands" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg perspective-wrap">
            {applianceBrands.map((b, i) => (
              <BrandCard key={i} {...b} index={i} />
            ))}
          </div>
        </div>
      </ScrollReveal3D>
    </div>
  </section>
);

export default Brands;
