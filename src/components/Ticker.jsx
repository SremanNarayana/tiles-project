
const items = [
  'PREMIUM TILES',
  'SANITARY WARE',
  'GRANITE & MARBLE',
  'CP FITTINGS',
  'HOME APPLIANCES',
  '15+ YEARS OF TRUST',
  'DIRECT FACTORY PRICING',
  'NO. 1 SHOWROOM IN MELUR',
];

const Ticker = () => {
  const content = [...items, ...items, ...items, ...items];

  return (
    <div
      className="relative w-full overflow-hidden py-4 md:py-5 my-4"
      style={{ background: 'rgba(2,10,22,0.72)', borderTop: '1px solid rgba(6,182,212,0.12)', borderBottom: '1px solid rgba(6,182,212,0.12)' }}
    >
      {/* Cyan top & bottom accent lines */}
      <div className="absolute top-0 left-0 w-full h-[1.5px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.4), rgba(192,155,82,0.3), rgba(6,182,212,0.4), transparent)' }} />
      <div className="absolute bottom-0 left-0 w-full h-[1.5px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.4), rgba(192,155,82,0.3), rgba(6,182,212,0.4), transparent)' }} />

      <div className="flex w-max animate-scroll-x">
        {content.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="text-sm md:text-base tracking-[0.22em] whitespace-nowrap uppercase font-display font-semibold text-gold-gradient">
              {item}
            </span>
            <span className="mx-8 md:mx-10" style={{ color: 'rgba(6,182,212,0.35)' }}>
              <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                <circle cx="3" cy="3" r="3" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
