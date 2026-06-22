
/**
 * Dramatic multi-layer animated ocean wave divider.
 * Waves roll, swell and crash between sections.
 *
 * @param {string}  fromColor  - background of section above
 * @param {string}  toColor    - background of section below (wave fill)
 * @param {boolean} flip       - flip vertically so wave crests downward
 * @param {number}  height     - height in px (default 120)
 */
const WaveDivider = ({
  fromColor = '#020C1B',
  toColor   = '#041228',
  flip      = false,
  height    = 120,
}) => {
  const scaleY = flip ? 'scaleY(-1)' : 'none';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: height,
        background: fromColor,
        overflow: 'hidden',
        lineHeight: 0,
      }}
    >
      {/* ── Layer 4: deepest base, slowest, most solid ── */}
      <div
        className="animate-wave4"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '220%',
          height: '100%',
          transformOrigin: 'bottom center',
          transform: scaleY,
        }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <path
            fill={toColor}
            d="
              M0,70
              C90,100 180,40 270,70
              C360,100 450,30 540,70
              C630,110 720,30 810,65
              C900,100 990,20 1080,70
              C1170,110 1260,35 1350,70
              C1410,95 1440,80 1440,80
              L1440,120 L0,120 Z
            "
          />
        </svg>
      </div>

      {/* ── Layer 3: mid-depth, medium speed ── */}
      <div
        className="animate-wave3"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '200%',
          height: '100%',
          transformOrigin: 'bottom center',
          transform: scaleY,
        }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <path
            fill={toColor}
            fillOpacity="0.7"
            d="
              M0,85
              C120,55 240,105 360,80
              C480,55 600,95 720,75
              C840,55 960,100 1080,80
              C1200,60 1320,95 1440,78
              C1560,60 1680,100 1800,80
              C1920,60 2040,95 2160,78
              L2160,120 L0,120 Z
            "
          />
        </svg>
      </div>

      {/* ── Layer 2: faster rolling wave ── */}
      <div
        className="animate-wave2"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '200%',
          height: '100%',
          transformOrigin: 'bottom center',
          transform: scaleY,
        }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <path
            fill={toColor}
            fillOpacity="0.5"
            d="
              M0,95
              C80,70 160,115 240,95
              C320,75 400,110 480,90
              C560,70 640,108 720,90
              C800,72 880,110 960,92
              C1040,74 1120,112 1200,92
              C1280,72 1360,110 1440,92
              C1520,74 1600,112 1680,92
              C1760,72 1840,108 1920,90
              C2000,72 2080,110 2160,90
              L2160,120 L0,120 Z
            "
          />
        </svg>
      </div>

      {/* ── Layer 1: fastest surface wave ── */}
      <div
        className="animate-wave1"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '200%',
          height: '100%',
          transformOrigin: 'bottom center',
          transform: scaleY,
        }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <path
            fill={toColor}
            fillOpacity="0.3"
            d="
              M0,105
              C60,90 120,118 180,105
              C240,92 300,115 360,105
              C420,95 480,115 540,105
              C600,95 660,115 720,105
              C780,95 840,115 900,105
              C960,95 1020,115 1080,105
              C1140,95 1200,115 1260,105
              C1320,95 1380,115 1440,105
              C1500,95 1560,115 1620,105
              C1680,95 1740,115 1800,105
              C1860,95 1920,115 1980,105
              C2040,95 2100,115 2160,105
              L2160,120 L0,120 Z
            "
          />
        </svg>
      </div>

      {/* ── Foam / white crest highlight ── */}
      <div
        className="animate-wave-foam"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '200%',
          height: '100%',
          transformOrigin: 'bottom center',
          transform: scaleY,
        }}
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          {/* Foam dots along wave crest */}
          <ellipse cx="120"  cy="94"  rx="28" ry="4" fill="rgba(255,255,255,0.25)" />
          <ellipse cx="360"  cy="80"  rx="22" ry="3" fill="rgba(255,255,255,0.20)" />
          <ellipse cx="600"  cy="90"  rx="30" ry="4" fill="rgba(255,255,255,0.22)" />
          <ellipse cx="840"  cy="82"  rx="20" ry="3" fill="rgba(255,255,255,0.18)" />
          <ellipse cx="1080" cy="93"  rx="26" ry="4" fill="rgba(255,255,255,0.22)" />
          <ellipse cx="1320" cy="80"  rx="24" ry="3" fill="rgba(255,255,255,0.18)" />
          <ellipse cx="220"  cy="100" rx="16" ry="2.5" fill="rgba(6,182,212,0.30)" />
          <ellipse cx="480"  cy="96"  rx="18" ry="2.5" fill="rgba(6,182,212,0.25)" />
          <ellipse cx="720"  cy="98"  rx="14" ry="2"   fill="rgba(6,182,212,0.28)" />
          <ellipse cx="960"  cy="96"  rx="20" ry="2.5" fill="rgba(6,182,212,0.25)" />
          <ellipse cx="1200" cy="99"  rx="16" ry="2"   fill="rgba(6,182,212,0.22)" />
          <ellipse cx="1440" cy="97"  rx="18" ry="2.5" fill="rgba(6,182,212,0.25)" />
        </svg>
      </div>
    </div>
  );
};

export default WaveDivider;
