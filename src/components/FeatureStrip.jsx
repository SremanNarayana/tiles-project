import { motion } from 'framer-motion';
import { Gem, Tags, LayoutGrid, Headset } from 'lucide-react';
import ScrollReveal3D from './ScrollReveal3D';
import TiltCard from './TiltCard';

const features = [
  { title: 'Premium Quality',    subtitle: 'World-class materials',   icon: Gem },
  { title: 'Affordable Pricing', subtitle: 'Direct factory rates',    icon: Tags },
  { title: '1000+ Designs',       subtitle: 'Exclusive collections',   icon: LayoutGrid },
  { title: 'Expert Assistance',  subtitle: 'Dedicated support team',  icon: Headset },
];

const FeatureStrip = () => (
  <section className="relative z-10 -mt-12 px-4 md:px-8 lg:px-16 mb-0" style={{ paddingBottom: '1.5rem' }}>
    <ScrollReveal3D direction="up" delay={0.1}>
      <div
        className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(4,18,40,0.82)',
          border: '1px solid rgba(6,182,212,0.12)',
          boxShadow: '0 8px 48px rgba(1,8,16,0.7)',
        }}
      >
        {features.map((f, i) => {
          const Icon = f.icon;
          const isNotLast = i < features.length - 1;
          return (
            <TiltCard key={i} intensity={6} lift={4}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-center gap-4 p-6 lg:p-8 cursor-default h-full transition-all duration-300"
                style={{
                  borderRight: isNotLast ? '1px solid rgba(6,182,212,0.08)' : 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                  style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.15)' }}
                >
                  <Icon size={22} strokeWidth={1.5} style={{ color: '#22D3EE' }} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base transition-colors duration-300" style={{ color: '#ffffff' }}>
                    {f.title}
                  </h3>
                  <p className="text-xs md:text-sm mt-0.5 font-sans" style={{ color: 'rgba(6,182,212,0.5)' }}>{f.subtitle}</p>
                </div>
              </motion.div>
            </TiltCard>
          );
        })}
      </div>
    </ScrollReveal3D>
  </section>
);

export default FeatureStrip;
