import { useState, useRef } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { scrollTo } from '../hooks/useLenis';

const FbIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TopNav = ({ activePage, setActivePage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastY = useRef(0);
  const navigate = useNavigate();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = lastY.current;

    if (latest < 80) {
      setNavHidden(false);
    } else if (latest > prev + 6) {
      setNavHidden(true);
      setIsMobileMenuOpen(false);
    } else if (latest < prev - 6) {
      setNavHidden(false);
    }

    setScrolled(latest > 40);
    lastY.current = latest;
  });

  const handleNavClick = (page, sectionId) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    /* If currently on a category page, navigate back to root first */
    if (window.location.pathname.startsWith('/categories/')) {
      navigate('/');
    }
    if (sectionId) {
      setTimeout(() => scrollTo(`#${sectionId}`, { duration: 1.4 }), 120);
    } else {
      setTimeout(() => scrollTo(0, { duration: 1.2 }), 60);
    }
  };

  const navLinks = [
    { name: 'Home',     page: 'home',         sectionId: null },
    { name: 'About Us', page: 'about',        sectionId: null },
    { name: 'Products', page: 'home',         sectionId: 'products' },
    { name: 'Gallery',  page: 'gallery',      sectionId: null },
    { name: 'Reviews',  page: 'testimonials', sectionId: null },
    { name: 'Contact',  page: 'home',         sectionId: 'contact' },
  ];

  const isActive = (item) =>
    activePage === item.page &&
    ['gallery', 'testimonials', 'about'].includes(item.page);

  const navBg = scrolled
    ? 'rgba(2,12,27,0.96)'
    : 'rgba(1,8,16,0.75)';

  const navBorder = scrolled
    ? '1px solid rgba(6,182,212,0.12)'
    : '1px solid rgba(255,255,255,0.04)';

  return (
    <motion.nav
      animate={{ y: navHidden ? '-110%' : '0%' }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        background: navBg,
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        borderBottom: navBorder,
        transition: 'background 0.4s ease, border-color 0.4s ease',
        boxShadow: scrolled ? '0 4px 32px rgba(1,8,16,0.6)' : 'none',
      }}
    >
      <div className="flex items-center justify-between px-5 md:px-10 lg:px-16 h-[72px]">

        {/* Logo */}
        <button
          onClick={() => handleNavClick('home', null)}
          className="flex items-center gap-3 group"
        >
          <img
            src="/logo.png"
            alt="Sri Amman Tiles"
            className="h-12 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
            style={{ filter: 'drop-shadow(0 2px 6px rgba(1,8,16,0.55))' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="flex flex-col leading-none gap-1">
            <span
              className="font-display font-bold uppercase tracking-[0.14em] text-transparent bg-clip-text"
              style={{
                fontSize: '14px',
                backgroundImage: 'linear-gradient(135deg, #C09B52 0%, #E8C97A 50%, #A67C35 100%)',
              }}
            >
              Sri Amman Tiles
            </span>
            <span className="text-[9px] tracking-widest font-medium" style={{ color: 'rgba(6,182,212,0.6)' }}>
              MELUR · SINCE 2011
            </span>
          </div>
        </button>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.page, item.sectionId)}
              className="relative text-sm font-medium transition-colors duration-200 group"
              style={{ color: isActive(item) ? '#22D3EE' : 'rgba(184,214,238,0.75)' }}
              onMouseEnter={e => { if (!isActive(item)) e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={e => { if (!isActive(item)) e.currentTarget.style.color = 'rgba(184,214,238,0.75)'; }}
            >
              {item.name}
              <span
                className="absolute -bottom-1 left-0 h-[1.5px] rounded-full transition-all duration-300"
                style={{
                  width: isActive(item) ? '100%' : '0%',
                  background: 'linear-gradient(90deg, #06B6D4, #22D3EE)',
                }}
              />
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+919942379987"
            className="flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: 'rgba(184,214,238,0.65)' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#22D3EE'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(184,214,238,0.65)'; }}
          >
            <Phone size={13} />
            +91 99423 79987
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919942379987"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: '#25D366' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#1da851'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#25D366'; }}
            title="Chat on WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </a>

          <button
            onClick={() => handleNavClick('home', 'contact')}
            className="btn-gold text-sm"
          >
            Visit Showroom
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg transition-colors"
          style={{ color: 'rgba(184,214,238,0.8)' }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(6,182,212,0.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden absolute top-full left-0 w-full px-5 py-6 flex flex-col gap-1 origin-top"
            style={{
              background: 'rgba(2,12,27,0.97)',
              borderBottom: '1px solid rgba(6,182,212,0.12)',
              boxShadow: '0 16px 48px rgba(1,8,16,0.8)',
            }}
          >
            {navLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.page, item.sectionId)}
                className="text-left px-4 py-3 rounded-xl text-base font-medium transition-colors"
                style={{
                  background: isActive(item) ? 'rgba(6,182,212,0.08)' : 'transparent',
                  color: isActive(item) ? '#22D3EE' : 'rgba(184,214,238,0.75)',
                  border: isActive(item) ? '1px solid rgba(6,182,212,0.15)' : '1px solid transparent',
                }}
              >
                {item.name}
              </button>
            ))}

            {/* WhatsApp in mobile menu */}
            <a
              href="https://wa.me/919942379987"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-colors"
              style={{ color: '#25D366' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </a>

            {/* Social icons */}
            <div className="px-4 py-3 flex items-center gap-3">
              <span className="text-xs font-medium tracking-widest mr-1" style={{ color: 'rgba(184,214,238,0.35)' }}>FOLLOW US</span>
              <a
                href="https://www.instagram.com/sri_amman_tiles/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{ background: 'rgba(225,48,108,0.10)', color: '#E1306C', border: '1px solid rgba(225,48,108,0.15)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(225,48,108,0.10)'; e.currentTarget.style.color = '#E1306C'; }}
              >
                <IgIcon />
              </a>
            </div>

            <div className="mt-3 pt-4" style={{ borderTop: '1px solid rgba(6,182,212,0.08)' }}>
              <button
                onClick={() => handleNavClick('home', 'contact')}
                className="btn-gold w-full justify-center text-sm"
              >
                Visit Showroom
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default TopNav;
