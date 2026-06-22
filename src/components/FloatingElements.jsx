import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const FbIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const IgIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;

import { motion, AnimatePresence } from 'framer-motion';

const FloatingElements = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Social sidebar – left */}
      <div
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col rounded-r-xl overflow-hidden"
        style={{
          background: 'rgba(4,18,40,0.85)',
          border: '1px solid rgba(6,182,212,0.12)',
          borderLeft: 'none',
        }}
      >
        <a
          href="#"
          aria-label="Facebook"
          className="p-3 transition-colors duration-200"
          style={{ color: 'rgba(6,182,212,0.5)', borderBottom: '1px solid rgba(6,182,212,0.08)' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#4A90D9'; e.currentTarget.style.background = 'rgba(24,119,242,0.10)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(6,182,212,0.5)'; e.currentTarget.style.background = 'transparent'; }}
        >
          <FbIcon />
        </a>
        <a
          href="#"
          aria-label="Instagram"
          className="p-3 transition-colors duration-200"
          style={{ color: 'rgba(6,182,212,0.5)' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#E1306C'; e.currentTarget.style.background = 'rgba(225,48,108,0.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(6,182,212,0.5)'; e.currentTarget.style.background = 'transparent'; }}
        >
          <IgIcon />
        </a>
      </div>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 left-6 md:left-auto md:right-8 md:bottom-28 z-40 p-3 rounded-full transition-all duration-200"
            style={{
              background: 'rgba(4,18,40,0.85)',
              border: '1px solid rgba(6,182,212,0.18)',
              color: 'rgba(6,182,212,0.6)',
              boxShadow: '0 4px 20px rgba(1,8,16,0.5)',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#22D3EE'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.45)'; e.currentTarget.style.background = 'rgba(6,182,212,0.10)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(6,182,212,0.6)'; e.currentTarget.style.borderColor = 'rgba(6,182,212,0.18)'; e.currentTarget.style.background = 'rgba(4,18,40,0.85)'; }}
            aria-label="Scroll to top"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingElements;
