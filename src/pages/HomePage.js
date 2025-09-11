import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/sections/Hero';
import Courses from '../components/sections/Courses';
import Testimonials from '../components/sections/Testimonials';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Contact from '../components/sections/Contact';
import Stats from '../components/sections/Stats';
import Section3D from '../components/animations/Section3D';
import ParallaxBackground from '../components/animations/ParallaxBackground';

const HomePage = () => {
  // Performance optimization: reduce animations on low-end devices
  const shouldUseHeavyAnimations = useMemo(() => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    
    // Check device capabilities
    const isMobile = window.innerWidth < 768;
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    
    return !isMobile && !isLowEndDevice;
  }, []);

  // Wrapper component for conditional animations
  const ConditionalWrapper = ({ children, useParallax = false, useSection3D = false }) => {
    if (!shouldUseHeavyAnimations) {
      return <div className="relative">{children}</div>;
    }
    
    let content = children;
    if (useSection3D) {
      content = (
        <Section3D animationType="fadeInUp" delay={0.1}>
          {content}
        </Section3D>
      );
    }
    if (useParallax) {
      content = (
        <ParallaxBackground offset={20}>
          {content}
        </ParallaxBackground>
      );
    }
    
    return content;
  };

  return (
    <div className="min-h-screen bg-blue-black relative overflow-visible">
      {/* Hero Section - No animation wrapper needed */}
      <section id="home">
        <Hero />
      </section>

      {/* Stats Section with conditional animations */}
      <ConditionalWrapper useParallax={true} useSection3D={true}>
        <section id="stats" className="relative bg-gradient-dark">
          <Stats />
        </section>
      </ConditionalWrapper>

      {/* Courses Section with conditional animations */}
      <ConditionalWrapper useParallax={true} useSection3D={true}>
        <section id="courses" className="relative w-full overflow-visible bg-gradient-to-br from-slate-900/50 to-slate-800/50" style={{ zIndex: 'auto' }}>
          <Courses />
        </section>
      </ConditionalWrapper>

      {/* Testimonials Section with conditional animations */}
      <ConditionalWrapper useParallax={true} useSection3D={true}>
        <section id="testimonials" className="relative">
          <Testimonials />
        </section>
      </ConditionalWrapper>

      {/* Why Choose Us Section with conditional animations */}
      <ConditionalWrapper useParallax={true} useSection3D={true}>
        <section id="why-choose-us" className="relative">
          <WhyChooseUs />
        </section>
      </ConditionalWrapper>

      {/* Contact Section with conditional animations */}
      <ConditionalWrapper useParallax={true} useSection3D={true}>
        <section id="contact" className="relative">
          <Contact />
        </section>
      </ConditionalWrapper>

      {/* Floating transition elements between sections, placed on a higher-depth parallax layer */}
      <ParallaxBackground offset={60}>
        <motion.div
          className="fixed pointer-events-none inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Floating orbs for visual depth - MADE RESPONSIVE */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl"
            animate={{
              y: [0, -50, 0],
              x: [0, 30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-12 h-12 sm:w-18 sm:h-18 md:w-24 md:h-24 bg-gradient-to-br from-orange-400/10 to-red-400/10 rounded-full blur-xl"
            animate={{
              y: [0, 40, 0],
              x: [0, -20, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </motion.div>
      </ParallaxBackground>
    </div>
  );
};

export default HomePage;