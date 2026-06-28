import { motion } from 'framer-motion';
import { Award, Users, MapPin } from 'lucide-react';
import showroomImage from "../assets/showroom.png";

const fadeUp = {
  hidden:   { opacity: 0, y: 40 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const About = () => (
  <div className="min-h-screen" style={{ background: 'rgba(1,8,16,0.72)' }}>

    {/* Hero banner */}
    <div className="relative h-56 md:h-72 overflow-hidden" style={{ background: '#010810' }}>
      <img
        src={showroomImage}
        alt="About Sri Amman Tiles"
        className="w-full h-full object-cover"
        style={{ opacity: 0.35 }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(1,8,16,0.5) 0%, rgba(2,12,27,0.95) 100%)' }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
        <span className="text-xs font-bold tracking-[0.3em] uppercase mb-3" style={{ color: '#22D3EE' }}>Our Story</span>
        <h1 className="font-display text-4xl md:text-5xl" style={{ color: '#ffffff' }}>About Sri Amman Tiles</h1>
      </div>
      {/* Wave bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px' }}>
        <div className="animate-wave2" style={{ position: 'absolute', bottom: 0, left: 0, width: '200%', height: '100%' }}>
          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
            <path fill="#020C1B" d="M0,20 C200,0 400,35 600,20 C800,5 1000,35 1200,20 C1300,13 1380,5 1440,20 C1580,35 1720,0 1860,20 L1860,40 L0,40 Z" />
          </svg>
        </div>
      </div>
    </div>

    <div className="glass-card max-w-5xl mx-4 md:mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-14 md:py-20 my-12">

      {/* Company description */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-20"
      >
        <span className="section-label">Who We Are</span>
        <h2 className="section-title mt-3 mb-8 max-w-3xl">
          Redefining Spaces With<br />
          <span className="text-gold-gradient">Uncompromising Quality</span>
        </h2>

        <div className="space-y-5 font-serif text-base md:text-lg leading-relaxed" style={{ color: 'rgba(184,214,238,0.70)' }}>
          <p>
            Founded with a vision to redefine architectural beauty, <strong style={{ color: '#ffffff', fontWeight: 600 }}>Sri Amman Tiles</strong> has grown
            into one of the most trusted destinations for premium tiles, granites, sanitary wares, and building
            materials in Melur and the surrounding regions.
          </p>
          <p>
            With two well-established showrooms in different locations, we proudly serve a wide range of residential
            and commercial customers with excellence, reliability, and unmatched product quality.
          </p>
          <p>
            We believe every space deserves a perfect balance of luxury, durability, and timeless elegance.
            Our carefully curated collections feature modern, classic, and contemporary designs that suit every
            style and budget.
          </p>
          <p>
            At Sri Amman Tiles, we are not just selling products — we are delivering trust, quality, innovation,
            and lasting value for every project we serve.
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-20"
      >
        {[
          { icon: Award, num: '15+', label: 'Years in Business' },
          { icon: Users, num: '5,000+', label: 'Happy Clients' },
          { icon: MapPin, num: '2',    label: 'Showroom Locations' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-2xl p-5 sm:p-6 text-center relative overflow-hidden"
              style={{
                background: 'rgba(4,18,40,0.95)',
                border: '1px solid rgba(6,182,212,0.12)',
              }}
            >
              <div className="absolute top-0 left-4 right-4 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)' }} />
              <Icon size={24} className="mx-auto mb-3" style={{ color: '#22D3EE' }} strokeWidth={1.5} />
              <div className="font-display text-2xl sm:text-3xl font-bold mb-1 text-gold-gradient">{s.num}</div>
              <div className="text-[11px] sm:text-xs uppercase tracking-widest leading-tight" style={{ color: 'rgba(6,182,212,0.45)' }}>{s.label}</div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Divider */}
      <div className="w-full h-px mb-20" style={{ background: 'rgba(6,182,212,0.08)' }} />

      {/* Founder section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(6,182,212,0.12)',
          boxShadow: '0 8px 48px rgba(1,8,16,0.5)',
        }}
      >
        {/* Cyan top accent */}
        <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, #06B6D4, #22D3EE, #0891B2)' }} />

        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center md:items-start">
          {/* Founder photo */}
          <div className="shrink-0 w-full md:w-auto">
            <div
              className="w-full md:w-96 aspect-[3/2] rounded-2xl overflow-hidden"
              style={{ border: '2px solid rgba(6,182,212,0.20)', boxShadow: '0 8px 32px rgba(1,8,16,0.5)' }}
            >
              <img
                src="/founder.png"
                alt="Chandra Kumar – Founder at Sri Amman Tiles"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Founder content */}
          <div className="flex-1">
            <span className="section-label">Meet The Founder</span>
            <h3 className="font-display text-2xl md:text-3xl mt-2 mb-1" style={{ color: '#ffffff' }}>Chandra Kumar</h3>
            <p className="text-sm font-semibold tracking-wide uppercase mb-5" style={{ color: 'rgba(192,155,82,0.75)' }}>Sri Amman Group Of Companies</p>

            <div className="space-y-4 font-serif text-base leading-relaxed" style={{ color: 'rgba(184,214,238,0.65)' }}>
              <p>
                Born in the village of Boothamangalam in Madurai District, Chandra Kumar completed his schooling
                at SVK Higher Secondary School, Thekkur, and his graduation in Melur. Coming from an agricultural
                family, he was instilled with the values of hard work and perseverance.
              </p>
              <p>
                Since 2011, he has been successfully running Sri Amman Tiles across two locations, leading a team
                of 20+ skilled staff members. With extensive experience in tiles and granites across South India,
                he has built a strong reputation for quality, trust, and customer satisfaction.
              </p>
              <p>
                Today, his mission is not only to grow a successful business, but to create lasting value for every
                customer — through durable, elegant, and modern building solutions.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

export default About;
