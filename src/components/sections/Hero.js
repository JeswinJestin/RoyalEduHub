import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, MapPin, Rocket, GraduationCap } from 'lucide-react';

const Hero = () => {
  const stats = [
    { number: '5K+', label: 'Students Taught' },
    { number: '3', label: 'Board Types' },
    { number: '100%', label: 'Live Classes' },
  ];

  // Background image crossfade (keeps same ratio/object-fit as first image)
  const BASE_IMAGE = '/your-hero-image.jpg';
  const ALT_IMAGE = '/your-hero-image-2.jpg'; // Optional second image (add to /public to enable)
  const [availableImages, setAvailableImages] = useState([BASE_IMAGE]);
  const [bgIndex, setBgIndex] = useState(0);

  // Preload optional second image if present; hide toggle if it doesn't exist
  useEffect(() => {
    const img = new Image();
    img.src = ALT_IMAGE;
    img.onload = () => setAvailableImages((prev) => (prev.includes(ALT_IMAGE) ? prev : [...prev, ALT_IMAGE]));
    // If it fails to load, we simply keep one image and no toggle is shown
  }, []);

  // Auto-rotate between images with a gentle fade when more than one is available
  useEffect(() => {
    if (availableImages.length < 2) return;
    const id = setInterval(() => setBgIndex((i) => (i + 1) % availableImages.length), 7000);
    return () => clearInterval(id);
  }, [availableImages.length]);

  return (
    <div className="relative min-h-screen">
      {/* Background Image(s) with fade */}
      <div className="absolute inset-0 overflow-hidden">
        {availableImages.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt="Royal Edu Hub Background"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: '75% center' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: i === bgIndex ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
        ))}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50"></div>

        {/* Removed manual background toggle dots to rely on auto-fade */}
      </div>
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 sm:pt-24 sm:pb-12 lg:pt-32 lg:pb-16 flex flex-col justify-center min-h-screen hero-mobile-clean">
         <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
           
           {/* Left Column - Text Content */}
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
             className="text-left hero-tablet-spacing"
           >
            {/* Badge - hide on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden md:inline-flex items-center gap-2 bg-gradient-to-b from-[#FF4500]/10 to-[#FF6B35]/10 border border-[#FF4500]/20 rounded-full px-4 py-2 mb-4 mt-4 backdrop-blur-sm"
            >
              <Star className="w-4 h-4 text-[#FF4500]" />
              <span className="text-sm font-medium bg-gradient-to-b from-[#FF4500] to-[#FF6B35] bg-clip-text text-transparent">
                Personalized Learning, Real Results
              </span>
            </motion.div>

            {/* Main heading - force 2 rows on mobile (second part breaks to new line), positioned lower */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-h1 hero-title-mobile hero-title-shadow text-white mb-3 sm:mb-6 leading-tight clamp-2 mt-8 sm:mt-0 hero-content-mobile"
            >
              <span>Transform Your</span>{' '}
              <span className="block sm:inline brand-gradient">Academic Journey</span>
            </motion.h1>

            {/* Subtext - visible on all screens, responsive text size */}
            <p className="text-gray-300 hero-subtitle-mobile text-xs sm:text-sm md:text-base mb-3 sm:mb-8 clamp-1 px-1 sm:px-0 hero-content-mobile">
               100% Live classes by expert mentors · Grades 5–12
             </p>

            {/* Mobile: compact highlights and modality line per Figma */}
            <div className="sm:hidden space-y-2.5 text-gray-300 hero-bullets-mobile mb-6 mt-4 hero-content-mobile">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#FF4500]/90"></span>
                <span className="text-[15px] leading-relaxed">100% Live classes by expert mentors</span>
              </div>
              <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF4500]/90"></span>
                  <span className="text-[15px] leading-relaxed">Aligned with CBSE, ICSE & State Syllabus</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF4500]/90"></span>
                <span className="text-[15px] leading-relaxed">Grades 5–12</span>
              </div>
              <div className="pt-2 text-[13px] tracking-wider uppercase text-white/90 font-medium">Online | Offline Classes</div>
            </div>

            {/* Detailed bullets and location - hide on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block space-y-4 sm:space-y-5 mb-6 sm:mb-8"
            >
              {/* Live Online Classes */}
              <div className="flex items-start gap-3">
                <Rocket className="w-5 h-5 text-[#FF4500] mt-1" />
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1">Live Online Classes for Grades 5–12</h3>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-3 h-3 text-[#FF4500]" />
                      <span className="text-xs sm:text-sm text-gray-300">Aligned with CBSE, ICSE & State Syllabus</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expert-led sessions */}
              <div className="flex items-start gap-3 mt-3">
                <GraduationCap className="w-5 h-5 text-[#FF4500] mt-1" />
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1">Expert-led sessions by India's leading academic mentors</h3>
                  {/* Sub-points */}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Play className="w-3 h-3 text-[#FF4500]" />
                      <span className="text-xs sm:text-sm text-gray-300">100% Live & Interactive</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-3 h-3 text-[#FF4500]" />
                      <span className="text-xs sm:text-sm text-gray-300">5000+ Students Taught</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-3 h-3 text-[#FF4500]" />
                      <span className="text-xs sm:text-sm text-gray-300">Covers 3 Major Boards</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Location - hide on mobile */}
            <div className="hidden md:flex items-start gap-3 mt-3 sm:mt-4 mb-4 sm:mb-6">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4500] mt-1" />
              <div>
                <h3 className="text-sm sm:text-base font-medium text-white mb-1">Kochi | Alappuzha</h3>
              </div>
            </div>

            {/* CTA Buttons - full width on mobile, positioned lower */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start gap-3 mt-8 sm:mt-6 hero-buttons-mobile"
            >
              <motion.button
                className="btn-primary btn-compact flex items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span>Book Free Demo Class</span>
                <ArrowRight className="w-4 h-4 sm:w-4 sm:h-4" />
              </motion.button>
              {/* Secondary CTA visible on mobile (outline), stacked below primary */}
               <motion.button
                 className="flex btn-secondary btn-compact items-center justify-center gap-2 w-full sm:w-auto whitespace-nowrap"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={() => {
                   const coursesSection = document.getElementById('courses');
                   if (coursesSection) {
                     coursesSection.scrollIntoView({ behavior: 'smooth' });
                   }
                 }}
               >
                 <Play className="w-4 h-4 sm:w-4 sm:h-4" />
                 <span>Explore Courses</span>
               </motion.button>
             </motion.div>
            {/* Mobile stats row - positioned lower on longer screens */}
            <div className="grid grid-cols-3 gap-4 max-w-sm sm:hidden mt-8 mb-2 hero-stats-mobile">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-bold brand-gradient mb-1">{stat.number}</div>
                  <div className="text-gray-400 text-xs leading-snug">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Desktop stats row - shown only on md+ directly under CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hidden md:grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mt-6 sm:mt-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold brand-gradient mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
         </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;