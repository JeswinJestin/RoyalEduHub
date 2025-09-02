import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const isTouchDevice = () => {
  try {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    );
  } catch (_) {
    return false;
  }
};

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function animateScrollTo(targetY, duration) {
  if (typeof window === 'undefined') return;
  const startY = window.scrollY || window.pageYOffset || 0;
  const distance = targetY - startY;
  if (Math.abs(distance) < 1 || duration <= 0) {
    window.scrollTo(0, targetY);
    return;
  }

  let startTime = null;
  let rafId = null;

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(1, elapsed / duration);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      rafId = window.requestAnimationFrame(step);
    } else if (rafId) {
      window.cancelAnimationFrame(rafId);
    }
  };

  rafId = window.requestAnimationFrame(step);
  return () => {
    if (rafId) window.cancelAnimationFrame(rafId);
  };
}

const getDuration = () => (isTouchDevice() ? 200 : 2000);

const getElementTop = (el) => {
  const rect = el.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return rect.top + scrollTop;
};

// Helper functions removed as they were unused
// Note: These can be re-added if needed for future enhancements

// Detect if element has a scrollable ancestor to avoid hijacking nested scroll containers
// (Currently unused but kept for reference)
/*
const hasScrollableAncestor = (el) => {
  try {
    let node = el;
    while (node && node !== document.body) {
      const style = window.getComputedStyle(node);
      const overflowY = style.overflowY;
      const canScroll = (overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight;
      if (canScroll) return true;
      node = node.parentElement;
    }
  } catch (_) {
    // ignore
  }
  return false;
};
*/

const SmoothScroll = ({ children }) => {
  const location = useLocation();

  // Attach smooth scrolling to in-page anchor links (href starting with "#")
  useEffect(() => {
    const duration = getDuration();

    const smoothClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        const y = getElementTop(targetElement);
        animateScrollTo(y, duration);
      }
    };

    const links = Array.from(document.querySelectorAll('a[href^="#"]'));
    links.forEach((link) => link.addEventListener('click', smoothClick));

    return () => {
      links.forEach((link) => link.removeEventListener('click', smoothClick));
    };
  }, [location.pathname]);

  // Handle route changes with hash (e.g., /about#team) after content mounts
  useEffect(() => {
    if (!location.hash) return;

    const duration = getDuration();
    // Wait a tick for the target to be present in the DOM
    const id = location.hash;
    let cancelled = false;
    const tryScroll = () => {
      if (cancelled) return;
      const target = document.querySelector(id);
      if (target) {
        const y = getElementTop(target);
        animateScrollTo(y, duration);
      }
    };

    const raf = requestAnimationFrame(() => {
      // Double requestAnimationFrame to ensure layout is ready
      requestAnimationFrame(tryScroll);
    });

    return () => {
      cancelAnimationFrame(raf);
      cancelled = true;
    };
  }, [location.hash, location.pathname]);

  // Removed auto-scroll behavior - keeping only smooth click/hash navigation

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
      {children}
    </motion.div>
  );
};

export default SmoothScroll;