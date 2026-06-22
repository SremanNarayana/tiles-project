
const OCEAN_VIDEOS = [
  'https://assets.mixkit.co/videos/44392/44392-720.mp4', // ocean aerial
  'https://assets.mixkit.co/videos/2091/2091-720.mp4',   // ocean waves crashing
  'https://assets.mixkit.co/videos/9294/9294-720.mp4',   // sea waves on shore
  'https://assets.mixkit.co/videos/15209/15209-720.mp4', // waves on beach
  'https://assets.mixkit.co/videos/48525/48525-720.mp4', // ocean waves dark
  'https://assets.mixkit.co/videos/17972/17972-720.mp4', // sea waves
];

const OceanBackground = () => (
  <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
    <video
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      autoPlay
      loop
      muted
      playsInline
    >
      {OCEAN_VIDEOS.map((src, i) => (
        <source key={i} src={src} type="video/mp4" />
      ))}
    </video>

    {/* Subtle dark vignette — keeps section text readable */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(ellipse 110% 100% at 50% 50%, rgba(1,8,16,0.05) 0%, rgba(1,8,16,0.48) 100%)',
    }} />

    {/* Top darken — navbar contrast */}
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: '200px',
      background: 'linear-gradient(180deg, rgba(1,8,16,0.70) 0%, transparent 100%)',
    }} />

    {/* Cool blue-dark tint to blend with the site palette */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(1,8,20,0.18)',
      mixBlendMode: 'multiply',
    }} />
  </div>
);

export default OceanBackground;
