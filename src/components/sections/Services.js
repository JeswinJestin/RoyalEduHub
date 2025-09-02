import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Video, Users, BookOpen, MessageSquare, BarChart3, Award, Star } from 'lucide-react';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // ALL services now use brand theme classes
  const services = [
    {
      icon: Video,
      title: 'Live Interactive Classes',
      description: 'Real-time learning with expert tutors in an engaging virtual classroom environment.',
      features: ['HD Video Quality', 'Interactive Whiteboard', 'Screen Sharing', 'Recording Available']
    },
    {
      icon: Users,
      title: '1:1 Personalized Coaching',
      description: 'Individual attention and customized learning plans tailored to your specific needs.',
      features: ['Custom Curriculum', 'Progress Tracking', 'Flexible Schedule', 'Direct Tutor Access']
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Study Material',
      description: 'Access to extensive study resources, notes, and practice materials.',
      features: ['Digital Library', 'Practice Tests', 'Previous Papers', 'Study Guides']
    },
    {
      icon: MessageSquare,
      title: '24/7 Doubt Resolution',
      description: 'Round-the-clock support to clear your doubts and queries instantly.',
      features: ['Instant Chat', 'Video Calls', 'Email Support', 'Discussion Forums']
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Detailed insights into your learning progress and performance metrics.',
      features: ['Progress Reports', 'Performance Graphs', 'Weakness Analysis', 'Improvement Tips']
    },
    {
      icon: Award,
      title: 'Certification & Recognition',
      description: 'Earn certificates and recognition for your achievements and milestones.',
      features: ['Completion Certificates', 'Achievement Badges', 'Merit Lists', 'Scholarships']
    }
  ];

  return (
    <section className="relative pt-10 sm:pt-12 md:pt-14 lg:pt-16 pb-14 sm:pb-16 bg-blue-black overflow-hidden">
      {/* Background Effects (simplified and unified) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-blue-black"></div>
      </div>

      {/* Main Content */}
      <section className="pt-6 sm:pt-8 lg:pt-10 pb-12 lg:pb-16 relative z-10 bg-blue-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section - STANDARDIZED TYPOGRAPHY */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500/15 to-indigo-500/15 border border-blue-500/30 rounded-full px-6 py-3 mb-5 backdrop-blur-sm"
            >
              <Star className="w-5 h-5 brand-text" />
              <span className="text-body-primary font-semibold brand-text">
                Our Services
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-h1 text-white mb-4 leading-tight"
            >
              Comprehensive{' '}
              <span className="brand-gradient">
                Learning Solutions
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-body-primary text-white/80 max-w-4xl mx-auto leading-relaxed"
            >
              We provide a complete ecosystem of educational services designed to enhance 
              your learning experience and maximize your academic potential with cutting-edge technology.
            </motion.p>
          </motion.div>

          {/* Services Grid - More compact */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.3 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -6,
                    transition: { duration: 0.2 }
                  }}
                  className="glass-effect rounded-2xl p-6 text-center brand-border border transition-all duration-300 group relative overflow-hidden h-full flex flex-col"
                >
                  {/* Hover Glow Effect - BRAND THEME */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl"></div>
                  
                  {/* Icon Container - Blue background with Orange icon */}
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-blue-500/15 to-indigo-500/15 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:scale-105 relative z-10"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 to-indigo-500/25 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                    <Icon className="w-8 h-8 text-orange-400 transition-all duration-300 group-hover:scale-110 relative z-10" />
                  </motion.div>
                  
                  {/* Content - STANDARDIZED TYPOGRAPHY */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-h3 text-white group-hover:text-white transition-colors duration-300 mb-3">
                      {service.title}
                    </h3>
                    
                    <p className="text-body-secondary text-white/70 mb-6 leading-relaxed flex-1">
                      {service.description}
                    </p>
                    
                    {/* Features List */}
                    <div className="space-y-2">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-left">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-600 to-orange-800 transition-all duration-300 group-hover:scale-125 flex-shrink-0 shadow-sm"></div>
                          <span className="text-body-small text-white/60 group-hover:text-white/80 transition-colors duration-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Services;