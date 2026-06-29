/*
  Ocean background — the exact turquoise aerial-ocean view from the reference.
  Served from a LOCAL file (public/ocean-bg.mp4) so it always loads and never
  falls back to a different clip. The poster (public/ocean-bg.jpg) paints
  instantly and also covers browsers that block video autoplay.
*/

const OceanBackground = () => (
  <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
    <video
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(1.12)' }}
      poster="/ocean-bg.jpg"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
    >
      {/* Local copy — primary */}
      <source src="/ocean-bg.mp4" type="video/mp4" />
      {/* Same exact clip, remote — only used if the local file is ever missing */}
      <source src="https://assets.mixkit.co/videos/2091/2091-720.mp4" type="video/mp4" />
    </video>

    {/* Subtle dark vignette — keeps section text readable */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse 110% 100% at 50% 50%, rgba(1,8,16,0.04) 0%, rgba(1,8,16,0.40) 100%)',
    }} />

    {/* Top darken — navbar contrast */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: '200px',
      background: 'linear-gradient(180deg, rgba(1,8,16,0.60) 0%, transparent 100%)',
    }} />

    {/* Cool blue-dark tint to blend with the site palette */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(1,8,20,0.13)',
      mixBlendMode: 'multiply',
    }} />
  </div>
);

export default OceanBackground;
