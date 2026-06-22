import { motion } from 'framer-motion';
import { Lightbulb, Layers, Truck, Hammer, ArrowRight } from 'lucide-react';
import ScrollReveal3D from './ScrollReveal3D';

const ServiceCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 xl:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.24)] transition-all duration-300"
    style={{ backdropFilter: 'blur(16px)' }}
  >
    <div
      className="w-14 h-14 rounded-[1.25rem] flex items-center justify-center mb-5"
      style={{ background: 'rgba(6,182,212,0.14)', color: '#22D3EE' }}
    >
      <Icon size={22} />
    </div>
    <h3 className="font-display text-xl xl:text-2xl mb-3" style={{ color: '#ffffff' }}>{title}</h3>
    <p className="text-sm leading-relaxed xl:text-base" style={{ color: 'rgba(184,214,238,0.72)' }}>{description}</p>
  </motion.div>
);

const Contact = () => (
  <section
    id="contact"
    className="section-spacing relative overflow-hidden"
    style={{ background: 'rgba(1,8,16,0.92)' }}
  >
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse 70% 55% at 20% 10%, rgba(6,182,212,0.06) 0%, transparent 62%)' }} />
    <div className="absolute inset-y-0 right-0 w-56 opacity-30 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse 40% 100% at 100% 50%, rgba(192,155,82,0.12) 0%, transparent 70%)' }} />

    <div className="glass-card max-w-7xl mx-auto px-5 md:px-10 lg:px-14 xl:px-16 py-14 md:py-16">
      <ScrollReveal3D direction="up">
        <div className="text-center mb-16">
          <span className="section-label">Showroom Advantages</span>
          <h2 className="section-title mt-3 mb-4">Your Project, Crafted With Care</h2>
          <div className="cyan-line mx-auto mb-5" />
          <p className="section-subtitle max-w-2xl mx-auto">
            Discover how Sri Amman Tiles supports every stage of your build with premium products, expert guidance, and delivery-ready project solutions.
          </p>
        </div>
      </ScrollReveal3D>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <ServiceCard
          icon={Lightbulb}
          title="Design Guidance"
          description="Receive tailored tile and layout recommendations for residential, commercial, and hospitality spaces."
        />
        <ServiceCard
          icon={Layers}
          title="Curated Selection"
          description="Shop curated ranges of tiles, granite, sanitary fittings, and accessories that elevate every room."
        />
        <ServiceCard
          icon={Truck}
          title="Delivery Excellence"
          description="Count on timely, secure delivery across Melur and nearby districts, every time."
        />
        <ServiceCard
          icon={Hammer}
          title="Project Support"
          description="Get help connecting with trusted installers, contractors, and aftercare services for a polished finish."
        />
      </div>

      <div className="mt-14 text-center">
        <motion.a
          href="#products"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 text-sm font-semibold text-white shadow-[0_18px_50px_rgba(6,182,212,0.22)]"
        >
          Explore Product Range
          <ArrowRight size={16} />
        </motion.a>
      </div>
    </div>
  </section>
);

export default Contact;
