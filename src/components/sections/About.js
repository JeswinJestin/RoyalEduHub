import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Users, Award, Clock, BookOpen, Globe, Star, TrendingUp, Shield, Zap, Heart, Rocket, Crown, GraduationCap, Brain, Code, Lightbulb, Coffee } from 'lucide-react';

// Custom Cursor Component
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);
    
    // Add event listeners for team cards
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      teamCards.forEach(card => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className={`fixed pointer-events-none z-50 mix-blend-difference transition-all duration-150 ease-out ${
        isHovering 
          ? 'w-16 h-16 brand-bg-gradient backdrop-blur-sm brand-border border' 
          : 'w-5 h-5 bg-white'
      } rounded-full`}
      style={{
        left: mousePosition.x - (isHovering ? 32 : 10),
        top: mousePosition.y - (isHovering ? 32 : 10),
      }}
      animate={{
        scale: isHovering ? 1.2 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28
      }}
    />
  );
};

// Interactive Team Card Component
const TeamCard = ({ member, index, isCEO = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: isCEO ? 1.03 : 1.01,
        rotateY: 3,
        rotateX: 3,
      }}
      className={`team-card group relative ${
        isCEO 
          ? 'col-span-full lg:col-span-2 lg:col-start-2 row-span-2' 
          : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div className={`
        relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 
        backdrop-blur-xl border border-white/20 transition-all duration-500
        ${isCEO ? 'p-8 h-72' : 'p-6 h-64'}
        hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/25
        group-hover:bg-gradient-to-br group-hover:from-white/15 group-hover:to-white/10
      `}>
        {/* Glare Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
            transition: 'transform 0.6s ease-out'
          }}
        />
        
        {/* CEO Crown */}
        {isCEO && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 brand-bg-gradient rounded-full p-3 shadow-lg"
          >
            <Crown className="w-6 h-6 text-white" />
          </motion.div>
        )}

        {/* Avatar */}
        <motion.div
          className={`
            relative mx-auto mb-4 rounded-full brand-bg-gradient
            flex items-center justify-center shadow-2xl
            ${isCEO ? 'w-24 h-24' : 'w-20 h-20'}
          `}
          whileHover={{ rotateY: 180 }}
          transition={{ duration: 0.6 }}
        >
          <member.icon className={`text-white ${isCEO ? 'w-12 h-12' : 'w-10 h-10'}`} />
          
          {/* Floating particles */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: isHovered 
                ? `0 0 30px rgba(255,255,255,0.2), 0 0 60px rgba(255,255,255,0.2)` 
                : `0 0 0px rgba(255,255,255,0)`
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Content */}
        <div className="text-center relative z-10">
          <motion.h3
            className={`font-bold text-white mb-2 ${isCEO ? 'text-2xl' : 'text-lg'}`}
          >
            {member.name}
          </motion.h3>
          
          <motion.p
            className={`brand-text font-semibold mb-3 ${isCEO ? 'text-base' : 'text-sm'}`}
            animate={{ scale: isHovered ? 1.05 : 1 }}
          >
            {member.role}
          </motion.p>
          
          <motion.p
            className={`text-white/80 leading-relaxed ${isCEO ? 'text-sm' : 'text-xs'}`}
            animate={{ opacity: isHovered ? 1 : 0.8 }}
          >
            {member.description}
          </motion.p>

          {/* Skills Tags */}
          <motion.div
            className="flex flex-wrap justify-center gap-1 mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {member.skills?.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs brand-bg-gradient brand-border border rounded-full text-white/90"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 brand-bg-gradient transform rotate-12 scale-150" />
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const teamY = useTransform(scrollYProgress, [0.3, 0.5], [50, 0]);
  const teamOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  // Team data
  const teamMembers = [
    {
      name: "Dr. Rajesh Kumar",
      role: "CEO & Founder",
      description: "Visionary leader with 15+ years in educational technology. Former IIT professor passionate about democratizing quality education.",
      icon: Crown,
      skills: ["Educational Leadership", "AI in Education", "Strategic Vision", "Innovation"]
    },
    {
      name: "Prof. Anita Sharma",
      role: "Head of Academics",
      description: "Distinguished educator with expertise in curriculum design and student psychology. Ensures our teaching methods are effective.",
      icon: GraduationCap,
      skills: ["Curriculum Design", "Educational Psychology", "Quality Assurance"]
    },
    {
      name: "Arjun Patel",
      role: "Lead Technology Officer",
      description: "Full-stack developer and AI specialist. Builds the cutting-edge platforms that power our interactive learning experiences.",
      icon: Code,
      skills: ["Full-Stack Development", "AI/ML", "System Architecture"]
    },
    {
      name: "Dr. Priya Mehta",
      role: "Learning Experience Designer",
      description: "Cognitive scientist focused on optimizing learning pathways. Creates personalized educational journeys for students.",
      icon: Brain,
      skills: ["UX Design", "Cognitive Science", "Learning Analytics"]
    },
    {
      name: "Vikram Singh",
      role: "Innovation Director",
      description: "Creative strategist who identifies emerging educational trends and integrates them into our platform.",
      icon: Lightbulb,
      skills: ["Innovation Strategy", "Trend Analysis", "Creative Direction"]
    }
  ];

  const features = [
    {
      icon: Target,
      title: 'Personalized Learning',
      description: 'Tailored curriculum designed to meet individual student needs with AI-powered adaptive learning paths.'
    },
    {
      icon: Users,
      title: 'Expert Tutors',
      description: 'Highly qualified educators from top institutions with proven track records in student success.'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Learn at your own pace with 24/7 access to study materials and recorded sessions.'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Curriculum',
      description: 'Complete coverage of CBSE, ICSE, and State board syllabi with updated content.'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Track record of improving student performance and confidence with measurable outcomes.'
    },
    {
      icon: Globe,
      title: 'Global Standards',
      description: 'International quality education accessible from anywhere with world-class resources.'
    }
  ];

  const stats = [
    { number: '5000+', label: 'Students Enrolled', icon: Users },
    { number: '95%', label: 'Success Rate', icon: TrendingUp },
    { number: '50+', label: 'Expert Tutors', icon: Award },
    { number: '24/7', label: 'Support Available', icon: Shield },
    { number: '500+', label: 'Expert Faculty', icon: GraduationCap }
  ];

  return (
    <>
      <CustomCursor />
      <section className="h-screen bg-gradient-dark relative overflow-hidden flex flex-col">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 brand-bg-gradient rounded-full blur-3xl opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 brand-bg-gradient rounded-full blur-3xl opacity-20"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10 flex-1 flex flex-col">
          
          {/* Main Header Section - Compact */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-8 flex-shrink-0"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center space-x-3 brand-bg-gradient brand-border border rounded-full px-4 py-2 mb-4 backdrop-blur-sm"
            >
              <Star className="w-4 h-4 brand-text" />
              <span className="text-sm font-semibold brand-text">
                About Royal Edu Hub
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-h2 font-bold mb-4 leading-tight"
            >
              Transforming Education Through{' '}
              <span className="brand-gradient">
                Innovation
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-6"
            >
              Royal Edu Hub revolutionizes learning by combining cutting-edge technology 
              with proven teaching methodologies to deliver exceptional educational experiences.
            </motion.p>

            {/* Stats Section - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                     className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm brand-border border hover:bg-white/10 transition-all duration-300"
                  >
                    <Icon className="w-6 h-6 brand-text mx-auto mb-2" />
                    <div className="text-xl md:text-2xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-xs text-white/70">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Meet the Team Section */}
          <motion.div
            ref={teamRef}
            style={{ y: teamY, opacity: teamOpacity }}
            className="mb-8 flex-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center mb-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={teamInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center space-x-3 brand-bg-gradient brand-border border rounded-full px-4 py-2 mb-4 backdrop-blur-sm"
              >
                <Users className="w-4 h-4 brand-text" />
                <span className="text-sm font-semibold brand-text">
                  Meet Our Team
                </span>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-h2 font-bold mb-4 text-white"
              >
                The Minds Behind{' '}
                <span className="brand-gradient">
                  Excellence
                </span>
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-base text-white/80 max-w-2xl mx-auto leading-relaxed"
              >
                Our diverse team of educators, technologists, and innovators work together 
                to create transformative learning experiences.
              </motion.p>
            </motion.div>

            {/* Team Grid - Compact */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {teamMembers.map((member, index) => (
                <TeamCard
                  key={index}
                  member={member}
                  index={index}
                  isCEO={index === 0}
                />
              ))}
            </div>
          </motion.div>

          {/* Our Mission Section (Features) - Compact */}
          <motion.div
            ref={featuresRef}
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center mb-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={featuresInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center space-x-3 brand-bg-gradient brand-border border rounded-full px-4 py-2 mb-4 backdrop-blur-sm"
              >
                <Target className="w-4 h-4 brand-text" />
                <span className="text-sm font-semibold brand-text">
                  Our Mission
                </span>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-h2 font-bold mb-4 text-white"
              >
                What Makes Us{' '}
                <span className="brand-gradient">
                  Different
                </span>
              </motion.h3>
            </motion.div>

            {/* Features Grid - Compact */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-6xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={featuresInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.3 + index * 0.05,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      y: -5
                    }}
                    className={`
                      group relative p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 
                      backdrop-blur-sm brand-border border transition-all duration-500
                      hover:shadow-2xl hover:bg-gradient-to-br hover:from-white/10 hover:to-white/15
                    `}
                  >
                    <div className="text-center">
                      <motion.div
                        className="
                          w-10 h-10 mx-auto mb-3 rounded-lg brand-bg-gradient 
                          flex items-center justify-center shadow-lg
                        "
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </motion.div>
                      
                      <h4 className="font-semibold text-white mb-2 text-sm transition-colors duration-300">
                        {feature.title}
                      </h4>
                      
                      <p className="text-xs text-white/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Hover effect overlay */}
                    <motion.div
                      className="absolute inset-0 brand-bg-gradient rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      initial={false}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;