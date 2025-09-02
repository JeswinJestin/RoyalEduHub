import { useEffect } from 'react';
import { useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animation variants for different effects
export const scrollAnimationVariants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  },
  rotateIn: {
    hidden: { opacity: 0, rotateY: 90 },
    visible: { opacity: 1, rotateY: 0, transition: { duration: 1, ease: "easeOut" } }
  },
  staggerChildren: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  },
  parallax3D: {
    hidden: { opacity: 0, z: -100, rotateX: 15 },
    visible: { 
      opacity: 1, 
      z: 0, 
      rotateX: 0, 
      transition: { duration: 1.2, ease: "easeOut" } 
    }
  }
};

// Main scroll animation hook
export const useScrollAnimation = (animationType = 'fadeInUp', delay = 0, threshold = 0.1) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: threshold
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        controls.start('visible');
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [controls, inView, delay]);

  return {
    ref,
    controls,
    variants: scrollAnimationVariants[animationType] || scrollAnimationVariants.fadeInUp
  };
};

// Parallax scroll hook
export const useParallaxScroll = (offset = 50) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, offset]);
  
  return { y };
};

// Smooth scroll to section
export const useSmoothScroll = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      }
  };

  return { scrollToSection };
};