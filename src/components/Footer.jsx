import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const IgIcon  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;

const Footer = ({ setActivePage }) => {
  const go = (page, id) => {
    setActivePage(page);
    if (id) {
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer style={{ background: 'rgba(1,8,16,0.80)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(6,182,212,0.10)' }}>

      {/* Depth glow */}
      <div style={{ position: 'absolute', top: '80px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '300px', background: 'radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 pt-10 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">

          {/* Brand */}
          <div>
            <button onClick={() => go('home', null)} className="flex items-center gap-3 mb-5 group">
              <img src="/logo.png" alt="Sri Amman Tiles"
                className="h-12 w-auto object-contain shrink-0 transition-transform duration-300 group-hover:scale-105"
                style={{ filter: 'drop-shadow(0 2px 6px rgba(1,8,16,0.55))' }}
                onError={(e) => { e.target.style.display = 'none'; }} />
              <div className="flex flex-col">
                <span className="font-display text-base font-semibold tracking-wide" style={{ color: '#ffffff' }}>Sri Amman Tiles</span>
                <span className="text-[9px] tracking-widest" style={{ color: 'rgba(6,182,212,0.45)' }}>MELUR · SINCE 2011</span>
              </div>
            </button>
            <p className="text-sm leading-relaxed mb-5 font-sans" style={{ color: 'rgba(184,214,238,0.45)' }}>
              Melur's most trusted showroom for premium tiles, granite, and complete building materials. 15+ years of quality service.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/sri_amman_tiles/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(184,214,238,0.4)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'transparent'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(184,214,238,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}>
                <IgIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-base font-semibold mb-5" style={{ color: '#ffffff' }}>Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { name: 'Home',        page: 'home',         id: null },
                { name: 'About Us',    page: 'about',        id: null },
                { name: 'Products',    page: 'home',         id: 'products' },
                { name: 'Gallery',     page: 'gallery',      id: null },
                { name: 'Reviews',     page: 'testimonials', id: null },
                { name: 'Contact Us',  page: 'home',         id: 'contact' },
              ].map((l) => (
                <li key={l.name}>
                  <button
                    onClick={() => go(l.page, l.id)}
                    className="text-sm transition-colors duration-200 flex items-center gap-1.5 font-sans group"
                    style={{ color: 'rgba(184,214,238,0.45)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#22D3EE'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(184,214,238,0.45)'; }}
                  >
                    <span className="w-1 h-1 rounded-full transition-colors" style={{ background: 'rgba(6,182,212,0.3)' }} />
                    {l.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display text-base font-semibold mb-5" style={{ color: '#ffffff' }}>Products</h4>
            <ul className="space-y-2.5">
              {['Premium Tiles', 'Granite & Kota Stones', 'Sanitary Ware', 'Accessories'].map((p) => (
                <li key={p}>
                  <button
                    onClick={() => go('home', 'products')}
                    className="text-sm transition-colors duration-200 flex items-center gap-1.5 font-sans"
                    style={{ color: 'rgba(184,214,238,0.45)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#22D3EE'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(184,214,238,0.45)'; }}
                  >
                    <span className="w-1 h-1 rounded-full" style={{ background: 'rgba(6,182,212,0.3)' }} />
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-base font-semibold mb-5" style={{ color: '#ffffff' }}>Find Us</h4>
            <div className="space-y-4 font-sans">
              <div className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(184,214,238,0.45)' }}>
                <MapPin size={14} className="shrink-0 mt-0.5" style={{ color: '#22D3EE' }} />
                <span>Karungalakudi Rd, Melur,<br />Tamil Nadu 625101</span>
              </div>
              <a href="tel:+919942379987"
                className="flex items-center gap-2.5 text-sm transition-colors"
                style={{ color: 'rgba(184,214,238,0.45)' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#22D3EE'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(184,214,238,0.45)'; }}>
                <Phone size={14} className="shrink-0" style={{ color: '#22D3EE' }} />
                +91 99423 79987
              </a>
              <a href="mailto:sriammangranitesandtiles@gmail.com"
                className="flex items-start gap-2.5 text-sm transition-colors break-all"
                style={{ color: 'rgba(184,214,238,0.45)' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#22D3EE'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(184,214,238,0.45)'; }}>
                <Mail size={14} className="shrink-0 mt-0.5" style={{ color: '#22D3EE' }} />
                sriammangranitesandtiles@gmail.com
              </a>
              <div className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(184,214,238,0.45)' }}>
                <Clock size={14} className="shrink-0" style={{ color: '#22D3EE' }} />
                <span>Mon–Sat: 9 AM – 7 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(6,182,212,0.08)' }}>
          <p className="text-xs font-sans" style={{ color: 'rgba(184,214,238,0.25)' }}>
            &copy; {new Date().getFullYear()} Sri Amman Tiles. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-xs transition-colors font-sans" style={{ color: 'rgba(184,214,238,0.25)' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#22D3EE'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(184,214,238,0.25)'; }}>Privacy Policy</a>
            <a href="#" className="text-xs transition-colors font-sans" style={{ color: 'rgba(184,214,238,0.25)' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#22D3EE'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(184,214,238,0.25)'; }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
