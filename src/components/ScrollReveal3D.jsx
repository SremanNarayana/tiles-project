import { motion } from 'framer-motion';

/**
 * Wraps children with a 3D scroll-reveal entrance.
 * Each element looks like it's emerging from "behind" the screen.
 *
 * direction:
 *   'up'     – comes from below with rotateX tilt (default, like floor tile rising)
 *   'left'   – slides in from the left with perspective
 *   'right'  – slides in from the right with perspective
 *   'zoom'   – scales in from depth (small → full size)
 */
const directionMap = {
  up: {
    hidden:  { opacity: 0, y: 80,   rotateX: 28, scale: 0.86 },
    visible: { opacity: 1, y: 0,    rotateX: 0,  scale: 1 },
  },
  left: {
    hidden:  { opacity: 0, x: -80,  rotateY: -20, scale: 0.9 },
    visible: { opacity: 1, x: 0,    rotateY: 0,   scale: 1 },
  },
  right: {
    hidden:  { opacity: 0, x: 80,   rotateY: 20,  scale: 0.9 },
    visible: { opacity: 1, x: 0,    rotateY: 0,   scale: 1 },
  },
  zoom: {
    hidden:  { opacity: 0, scale: 0.65, z: -300 },
    visible: { opacity: 1, scale: 1,    z: 0 },
  },
};

const ScrollReveal3D = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 1.05,
  className = '',
  once = true,
  margin = '-100px',
}) => {
  const { hidden, visible } = directionMap[direction] || directionMap.up;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={{
        hidden,
        visible: {
          ...visible,
          transition: {
            duration,
            delay,
            ease: [0.16, 1, 0.3, 1],   // exponential ease-out — snappy, premium
          },
        },
      }}
      style={{
        transformPerspective: 1400,
        transformOrigin: direction === 'up' ? 'center bottom' : 'center center',
        willChange: 'transform, opacity',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal3D;
