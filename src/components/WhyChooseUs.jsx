import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Gem, HeartHandshake, Zap, Trophy } from 'lucide-react';
import ScrollReveal3D from './ScrollReveal3D';
import TiltCard from './TiltCard';

const reasons = [
  { text: 'Complete building solution under one roof',        icon: ShieldCheck },
  { text: 'Warm welcoming of every customer',                icon: HeartHandshake },
  { text: 'Clean and clear showroom display',                icon: Gem },
  { text: 'Timely service and delivery',                     icon: Zap },
  { text: 'Futuristic designs at best rates',                icon: Trophy },
  { text: 'Listening to the customers always',               icon: CheckCircle2 },
  { text: 'Well experienced & knowledgeable staff',          icon: CheckCircle2 },
  { text: 'Pleasant showroom experience',                    icon: HeartHandshake },
  { text: 'Excellent post-purchase customer support',        icon: ShieldCheck },
  { text: 'Ready to go beyond business for you',             icon: CheckCircle2 },
  { text: 'Direct factory billing for best prices',          icon: Gem },
  { text: 'Free consultation for design selection',          icon: CheckCircle2 },
  { text: 'Great value for money on every purchase',         icon: Trophy },
  { text: 'Labour arrangements available on request',        icon: ShieldCheck },
  { text: 'Free delivery service for local orders',          icon: Zap },
];

const WhyChooseUs = () => (
  <section
    className="section-spacing relative overflow-hidden"
    style={{ background: 'rgba(2,10,22,0.72)' }}
  >
    {/* Ocean depth lighting */}
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse 90% 50% at 50% -5%, rgba(6,182,212,0.07) 0%, transparent 65%)' }} />
    <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
      style={{ background: 'linear-gradient(to top, rgba(2,12,27,0.6), transparent)' }} />

    {/* Floating bubbles */}
    <div className="absolute top-20 left-10 w-3 h-3 rounded-full border border-cyan-400/20 animate-bubble pointer-events-none" />
    <div className="absolute top-10 right-16 w-2 h-2 rounded-full bg-cyan-400/15 animate-bubble-alt pointer-events-none" />
    <div className="absolute top-[45%] left-6 w-4 h-4 rounded-full border border-gold-400/15 animate-bubble pointer-events-none" style={{ animationDelay: '3s' }} />
    <div className="absolute bottom-20 right-12 w-5 h-5 rounded-full border border-cyan-400/15 animate-bubble-alt pointer-events-none" style={{ animationDelay: '1s' }} />

    <div className="glass-card max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">

      {/* Header */}
      <ScrollReveal3D direction="up" delay={0}>
        <div className="text-center mb-16">
          <span className="section-label">Our Commitment</span>
          <h2 className="section-title mt-3 mb-4">Why Choose Sri Amman Tiles?</h2>
          <div className="cyan-line mx-auto mb-4" />
          <p className="section-subtitle max-w-xl mx-auto">
            We go beyond selling products — we deliver trust, quality, and lasting value with every project.
          </p>
        </div>
      </ScrollReveal3D>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 perspective-wrap">
        {reasons.map((r, i) => {
          const Icon = r.icon;
          return (
            <TiltCard key={i} intensity={7} lift={6}>
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  delay: (i % 3) * 0.07 + Math.floor(i / 3) * 0.05,
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="ocean-card p-5 flex items-start gap-4 cursor-default relative h-full"
                style={{ borderRadius: '0.75rem' }}
              >
                {/* Cyan top shimmer */}
                <div className="absolute top-0 left-4 right-4 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.25), transparent)' }} />
                {/* Cyan left accent on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(180deg, #22D3EE, #0891B2)' }} />

                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                  style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.15)' }}>
                  <Icon size={18} strokeWidth={1.5} style={{ color: '#22D3EE' }} />
                </div>
                <p className="text-sm leading-relaxed mt-1 font-sans" style={{ color: 'rgba(184,214,238,0.80)' }}>
                  {r.text}
                </p>
              </motion.div>
            </TiltCard>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
