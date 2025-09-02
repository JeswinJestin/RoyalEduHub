import React, { useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const ParallaxBackground = ({ children, offset = 50, disableOnTouch = true }) => {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Determine if device is touch/coarse pointer
  const isTouchDevice = useMemo(() => {
    if (!disableOnTouch) return false;
    try {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    } catch (_) {
      return false;
    }
  }, [disableOnTouch]);

  // Final effective offset considering user preferences and device
  const effectiveOffset = useMemo(() => {
    if (prefersReducedMotion) return 0;
    if (isTouchDevice) return Math.max(0, Math.floor(offset * 0.4));
    return offset;
  }, [prefersReducedMotion, isTouchDevice, offset]);

  const y = useTransform(scrollY, [0, 1000], [0, effectiveOffset]);
  const opacity = useTransform(scrollY, [0, 300, 700, 1000], [1, 0.96, 0.9, 0.85]);

  return (
    <motion.div style={{ y, opacity }} className="relative">
      {children}
    </motion.div>
  );
};

export default ParallaxBackground;