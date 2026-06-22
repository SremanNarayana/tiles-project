import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

/**
 * Wraps children in a mouse-tracking 3D tilt container.
 * intensity – max rotation in degrees (default 10)
 * lift      – how much the card "floats up" on hover in px (default 10)
 *
 * Dynamic shadow shifts with tilt direction for a convincing depth illusion.
 */
const TiltCard = ({ children, className = '', intensity = 10, lift = 10 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springCfg = { stiffness: 250, damping: 18, mass: 0.4 };

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), springCfg);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), springCfg);
  const translateZ = useSpring(useMotionValue(0), springCfg);
  const scale     = useSpring(1, { stiffness: 200, damping: 20 });

  // Dynamic shadow — shifts opposite to tilt (light source is top-left)
  const shadowX    = useTransform(rotateY, [-intensity, 0, intensity], ['8px', '0px', '-8px']);
  const shadowY    = useTransform(rotateX, [-intensity, 0, intensity], ['-6px', '4px', '12px']);
  const shadowBlur = useSpring(useMotionValue(20), { stiffness: 120, damping: 20 });

  // Build the layered dynamic shadow string
  const boxShadow = useMotionTemplate`
    0 1px 2px rgba(28,25,23,0.04),
    ${shadowX} ${shadowY} ${shadowBlur}px rgba(28,25,23,0.10),
    0 28px 60px rgba(28,25,23,0.06)
  `;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    scale.set(1.02);
    translateZ.set(lift);
    shadowBlur.set(36);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
    translateZ.set(0);
    shadowBlur.set(20);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        z: translateZ,
        boxShadow,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default TiltCard;
