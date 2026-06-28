import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ScrollReveal3D from './ScrollReveal3D';
import TiltCard from './TiltCard';
import { scrollTo } from '../hooks/useLenis';
import showroomImage from "../assets/showroom.png";

const stats = [
  { number: '15+',    label: 'Years of Service' },
  { number: '100+',   label: 'Tile Designs' },
  { number: '1,000+', label: 'Orders Completed' },
  { number: '5,000+', label: 'Trusted Clients' },
];

const highlights = [
  'Started with a vision to eliminate long-distance travel for quality materials.',
  'Direct billing from factories ensuring the best pricing for our customers.',
  'A complete building solution under one roof.',
];

const WhoWeAre = () => (
  <section
    id="about"
    className="section-spacing relative overflow-hidden"
    style={{ background: 'rgba(1,8,16,0.72)' }}
  >
    {/* Ocean glow background radials */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[120px] pointer-events-none"
      style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)' }} />
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
      style={{ background: 'radial-gradient(ellipse, rgba(192,155,82,0.05) 0%, transparent 70%)' }} />

    {/* Floating bubbles */}
    <div className="absolute top-16 right-12 w-4 h-4 rounded-full border border-cyan-400/20 animate-bubble pointer-events-none" />
    <div className="absolute top-40 right-24 w-2 h-2 rounded-full bg-cyan-400/15 animate-bubble-alt pointer-events-none" />
    <div className="absolute bottom-24 left-8 w-3 h-3 rounded-full border border-gold-400/20 animate-bubble pointer-events-none" style={{ animationDelay: '1s' }} />

    <div className="glass-card max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Image */}
        <ScrollReveal3D direction="left" delay={0}>
          <div className="relative">
            <TiltCard intensity={6} lift={10}>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5]"
                style={{ boxShadow: '0 8px 48px rgba(1,8,16,0.7), 0 0 0 1px rgba(6,182,212,0.08)' }}>
                <img
                  src={showroomImage}
                  alt="Sri Amman Tiles Showroom"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(2,12,27,0.8) 0%, rgba(2,12,27,0.2) 50%, transparent 100%)' }} />
                {/* Glass caption */}
                <div className="absolute bottom-6 left-6 right-6 rounded-xl p-4"
                  style={{ background: 'rgba(2,12,27,0.95)', border: '1px solid rgba(6,182,212,0.15)' }}>
                  <div className="absolute top-0 left-6 right-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.4), transparent)' }} />
                  <p className="font-display text-base font-semibold" style={{ color: '#ffffff' }}>SRI AMMAN TILES</p>
                  <p className="text-xs mt-0.5 font-sans" style={{ color: 'rgba(6,182,212,0.6)' }}>Melur, Tamil Nadu – Est. 2009</p>
                </div>
              </div>
            </TiltCard>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotateY: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transformPerspective: 800,
                position: 'absolute',
                top: '-1.5rem',
                right: '-1.5rem',
                background: 'linear-gradient(135deg, #041228 0%, #061A3A 100%)',
                border: '1px solid rgba(192,155,82,0.25)',
                boxShadow: '0 8px 32px rgba(1,8,16,0.8), 0 0 0 1px rgba(192,155,82,0.10)',
              }}
              className="text-white rounded-2xl p-5 hidden md:block"
            >
              <div className="absolute top-0 left-6 right-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(192,155,82,0.5), transparent)' }} />
              <div className="text-3xl font-display font-bold" style={{ color: '#E8C97A' }}>15+</div>
              <div className="text-xs mt-1 tracking-wide uppercase" style={{ color: 'rgba(6,182,212,0.55)' }}>Years of Trust</div>
            </motion.div>

            {/* Cyan accent bar */}
            <div className="absolute -left-3 top-12 w-1 h-32 rounded-full hidden lg:block"
              style={{ background: 'linear-gradient(180deg, #22D3EE, #0891B2)' }} />
          </div>
        </ScrollReveal3D>

        {/* Content */}
        <ScrollReveal3D direction="right" delay={0.15}>
          <span className="section-label">Who We Are</span>

          <h2 className="section-title mt-3 mb-6">
            Melur's Most Trusted<br />
            <span className="text-gold-gradient">Building Materials Store</span>
          </h2>

          <p className="section-subtitle mb-8">
            Sri Amman Tiles is a trusted tiles and building materials showroom in Melur,
            serving customers across the region with premium tiles, granite, sanitary ware,
            and construction essentials — all at the best prices.
          </p>

          <ul className="space-y-4 mb-10">
            {highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.13, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 size={20} className="shrink-0 mt-0.5" style={{ color: '#22D3EE' }} />
                <span className="text-sm md:text-base font-sans leading-relaxed" style={{ color: 'rgba(184,214,238,0.75)' }}>{h}</span>
              </motion.li>
            ))}
          </ul>

          <motion.button
            onClick={() => scrollTo('#showroom')}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-gold inline-flex"
          >
            Visit Our Showroom
            <ArrowRight size={16} />
          </motion.button>
        </ScrollReveal3D>
      </div>

      {/* Stats grid */}
      <div className="mt-20 lg:mt-28 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <TiltCard key={i} intensity={7} lift={8}>
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="ocean-card p-6 text-center cursor-default relative"
              style={{ borderRadius: '1rem' }}
            >
              <div className="absolute top-0 left-6 right-6 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)' }} />
              <div className="text-3xl md:text-4xl font-display font-bold mb-2 text-gold-gradient">{s.number}</div>
              <div className="text-xs md:text-sm uppercase tracking-widest font-medium" style={{ color: 'rgba(6,182,212,0.55)' }}>{s.label}</div>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </div>
  </section>
);

export default WhoWeAre;
