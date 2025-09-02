import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const Section3D = ({ 
  children, 
  animationType = 'fadeInUp', 
  delay = 0, 
  threshold = 0.1,
  className = ''
}) => {
  const { ref, controls } = useScrollAnimation(animationType, delay, threshold);

  // Define animation variants based on type
  const getVariants = () => {
    switch (animationType) {
      case 'scaleIn':
        return {
          hidden: { opacity: 0, scale: 0.8, y: 30 },
          visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay
            }
          }
        };
      
      case 'rotateIn':
        return {
          hidden: { opacity: 0, rotateY: -45, scale: 0.9 },
          visible: { 
            opacity: 1, 
            rotateY: 0, 
            scale: 1,
            transition: {
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay
            }
          }
        };
      
      case 'parallax3D':
        return {
          hidden: { opacity: 0, z: -100, y: 50 },
          visible: { 
            opacity: 1, 
            z: 0, 
            y: 0,
            transition: {
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay
            }
          }
        };
      
      default: // fadeInUp
        return {
          hidden: { opacity: 0, y: 50, scale: 0.95 },
          visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay
            }
          }
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {children}
    </motion.div>
  );
};

export default Section3D;