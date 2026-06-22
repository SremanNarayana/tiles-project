import { motion } from 'framer-motion';
import { MapPin, Navigation, Store } from 'lucide-react';
import ScrollReveal3D from './ScrollReveal3D';
import TiltCard from './TiltCard';

const branches = [
  {
    name:    'Melur Branch',
    address: 'Karungalakudi Rd, Melur, Madurai District, Tamil Nadu 625101',
    status:  'Now Open',
    active:  true,
    img:     'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&q=80&w=600',
    mapsUrl: 'https://www.google.com/maps/place/SRI+AMMAN+TILES/@10.1498776,78.3571733,17z/data=!4m6!3m5!1s0x3b0097007ba13edf:0x227a0946db52eec9!8m2!3d10.1498987!4d78.3573747!16s/g/11mylyfnm0?entry=tts&g_ep=EgoyMDI2MDYxNi4wIPu8ASoASAFQAw==&skid=9b5b967b-1a43-4f1f-83c1-833ae5407f6d',
  },
  {
    name:    'Singamunari Branch',
    address: 'Singamunari, Sivagangai District, Tamil Nadu',
    status:  'Established',
    active:  false,
    img:     'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600',
    mapsUrl: 'https://maps.google.com/maps?q=Singamunari,+Sivagangai',
  },
];

const OurBranches = () => (
  <section
    className="section-spacing relative overflow-hidden"
    style={{ background: 'rgba(2,10,22,0.72)' }}
  >
    {/* Ocean glow */}
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,182,212,0.06) 0%, transparent 60%)' }} />

    {/* Animated bubbles */}
    <div className="absolute top-16 left-10 w-4 h-4 rounded-full border border-cyan-400/15 animate-bubble pointer-events-none" />
    <div className="absolute bottom-20 right-14 w-3 h-3 rounded-full bg-cyan-400/10 animate-bubble-alt pointer-events-none" />

    <div className="glass-card max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">

      {/* Header */}
      <ScrollReveal3D direction="up">
        <div className="text-center mb-16">
          <span className="section-label">Our Locations</span>
          <h2 className="section-title mt-3 mb-4">Explore Our Showrooms</h2>
          <div className="cyan-line mx-auto" />
        </div>
      </ScrollReveal3D>

      {/* Branch cards */}
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto perspective-wrap">
        {branches.map((b, i) => (
          <TiltCard key={i} intensity={7} lift={12}>
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.18, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-2xl overflow-hidden h-full transition-all duration-500"
              style={{
                background: 'rgba(4,18,40,0.95)',
                border: '1px solid rgba(6,182,212,0.10)',
                boxShadow: '0 8px 40px rgba(1,8,16,0.6)',
              }}
            >
              {/* Top cyan sweep on hover */}
              <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[1.5px] transition-all duration-500 ease-out z-10"
                style={{ background: 'linear-gradient(90deg, #06B6D4, #22D3EE, #06B6D4)' }} />

              {/* Background image */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={b.img}
                  alt={b.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  style={{ opacity: 0.4 }}
                />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, rgba(4,18,40,0.3) 0%, rgba(4,18,40,0.95) 100%)' }} />

                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: b.active ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.06)',
                      border: b.active ? '1px solid rgba(16,185,129,0.30)' : '1px solid rgba(255,255,255,0.10)',
                      color: b.active ? '#34D399' : 'rgba(184,214,238,0.5)',
                    }}
                  >
                    {b.active && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />}
                    {b.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(192,155,82,0.08)', border: '1px solid rgba(192,155,82,0.18)' }}>
                    <Store size={18} style={{ color: '#E8C97A' }} />
                  </div>
                  <h3 className="text-xl font-display font-semibold" style={{ color: '#ffffff' }}>{b.name}</h3>
                </div>

                <p className="text-sm leading-relaxed flex items-start gap-2 mb-6 font-sans" style={{ color: 'rgba(184,214,238,0.55)' }}>
                  <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: 'rgba(6,182,212,0.5)' }} />
                  {b.address}
                </p>

                <a
                  href={b.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300"
                  style={{
                    background: 'rgba(6,182,212,0.08)',
                    border: '1px solid rgba(6,182,212,0.18)',
                    color: 'rgba(34,211,238,0.8)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(6,182,212,0.18)';
                    e.currentTarget.style.color = '#22D3EE';
                    e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(6,182,212,0.08)';
                    e.currentTarget.style.color = 'rgba(34,211,238,0.8)';
                    e.currentTarget.style.borderColor = 'rgba(6,182,212,0.18)';
                  }}
                >
                  Get Directions
                  <Navigation size={14} />
                </a>
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm mt-12 font-sans"
        style={{ color: 'rgba(6,182,212,0.4)' }}
      >
        Serving customers across Melur & Sivagangai with premium tiles and complete building solutions.
      </motion.p>
    </div>
  </section>
);

export default OurBranches;
