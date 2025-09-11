import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  BookOpen, 
  Users, 
  Target, 
  Heart, 
  Zap,
  Crown,
  GraduationCap,
  Palette,
  Code,
  Briefcase,
  TrendingUp,
  Settings,
  Megaphone,
  Rocket,
  BarChart3
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const AboutPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State to track active flipped card (single active at a time)
  const [activeCardId, setActiveCardId] = useState(null);

  const location = useLocation();
  useEffect(() => {
    const id = location.hash?.replace('#', '');
    if (!id) {
      // If no hash, scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Enhanced scroll handling with multiple fallbacks for reliability
    const scrollToElement = () => {
      try {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
      } catch (_) {}
      return false;
    };

    // Immediate scroll attempt
    if (scrollToElement()) return;

    // Multiple fallbacks with increasing delays to handle loading states
    const timeouts = [];
    
    // Quick fallback for fast renders
    timeouts.push(setTimeout(() => {
      if (scrollToElement()) {
        timeouts.forEach(t => clearTimeout(t));
      }
    }, 50));
    
    // Medium fallback for slower renders
    timeouts.push(setTimeout(() => {
      if (scrollToElement()) {
        timeouts.forEach(t => clearTimeout(t));
      }
    }, 200));
    
    // Final fallback for very slow renders
    timeouts.push(setTimeout(() => {
      scrollToElement();
    }, 500));

    return () => timeouts.forEach(t => clearTimeout(t));
  }, [location.hash, location.pathname]);

  // removed obsolete multi-card flip logic; now using single-active card state
  const toggleCardFlip = (cardId) => {
    setActiveCardId(prev => (prev === cardId ? null : cardId));
  };

  // Updated team with 5 core members - organized for specific layout
  const teamMembers = [
    // First row: CEO, COO, CTIO
    {
      id: "francis-ceo",
      name: "Francis K Siby",
      role: "Founder & CEO (Chief Executive Officer)",
      description: "Visionary leader with extensive experience in educational technology and student development.",
      workDescription: "Leads strategic vision and company direction. Oversees all major business decisions, partnerships, and growth initiatives. Ensures Royal Edu Hub maintains its mission of accessible, quality education for all students worldwide.",
      image: "/team/francis.webp",
      icon: Crown,
      workIcon: Briefcase,
      isCEO: true,
      position: "ceo"
    },
    {
      id: "neethu-coo",
      name: "Neethu Poulose",
      role: "COO - Chief Operating Officer",
      description: "Operational excellence expert ensuring smooth delivery of educational services.",
      workDescription: "Manages day-to-day operations and ensures seamless service delivery. Coordinates between departments, optimizes processes, and maintains quality standards across all educational programs and student interactions.",
      image: "/team/neethu.webp", 
      icon: Settings,
      workIcon: BarChart3,
      position: "coo"
    },
    {
      id: "jeswin-cto",
      name: "Jeswin Thomas Jestin",
      role: "CTIO - Chief Technology & Innovation Officer",
      description: "Technology visionary developing cutting-edge learning platforms and educational tools.",
      workDescription: "Develops and maintains the technological infrastructure powering Royal Edu Hub. Creates innovative learning platforms, implements AI-driven educational tools, and ensures scalable, secure technology solutions.",
      image: "/team/jeswin.webp",
      icon: Rocket,
      workIcon: Code,
      position: "cto"
    },
    // Second row: CMO and CCD
    {
      id: "dona-cmo",
      name: "Dona Thomas",
      role: "CMO - Chief Marketing Officer", 
      description: "Strategic marketing expert driving Royal Edu Hub's growth and brand development.",
      workDescription: "Develops comprehensive marketing strategies to reach students globally. Manages brand positioning, digital marketing campaigns, and community outreach programs to expand Royal Edu Hub's educational impact.",
      image: "/team/dona1.webp",
      icon: Megaphone,
      workIcon: TrendingUp,
      position: "cmo"
    },
    {
      id: "joslet-ccd",
      name: "Joslet Siby", 
      role: "CCD - Chief Creative Director",
      description: "Creative mastermind crafting compelling visual experiences and educational content design.",
      workDescription: "Creates engaging visual content and educational materials. Designs user interfaces, develops creative learning resources, and ensures all visual communications align with Royal Edu Hub's educational mission.",
      image: "/team/joslet1.webp",
      icon: Palette,
      workIcon: Heart,
      position: "creative"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Student-Centric",
      description: "Every decision we make is focused on the student's success and growth."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Leveraging technology to create engaging and effective learning experiences."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Committed to delivering the highest quality education and support."
    },
    {
      icon: Users,
      title: "Personalization",
      description: "Tailored learning experiences that adapt to individual student needs."
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Blue tone blend */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
        {/* Background Pattern - SIMPLIFIED AND UNIFIED */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_40%)]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center space-x-3 brand-bg-gradient brand-border border rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
            >
              <BookOpen className="w-5 h-5 brand-text" />
              <span className="text-body-primary font-semibold brand-text">
                Our Story
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-about-title text-white mb-6 leading-tight"
            >
              Empowering Students,{" "}
              <span className="brand-gradient">
                Transforming Learning
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-body-primary text-white/80 max-w-3xl mx-auto mb-12 text-center"
            >
              At Royal Edu Hub, we believe education should be accessible to everyone, everywhere. We connect passionate educators with eager learners worldwide.
            </motion.p>
            
            {/* Founder's Vision Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <h3 className="text-h2 text-white mb-6 text-center">
                  Founder's{" "}
                  <span className="brand-gradient">
                    Vision
                  </span>
                </h3>
                
                <blockquote className="text-body-primary text-white/90 leading-relaxed italic text-justify mb-6">
                  "When I started Royal Edu Hub, my dream was simple — to create a world where learning and teaching are not limited by geography. I wanted to give talented tutors, who couldn't always reach offline workplaces, a platform to share their knowledge, and at the same time, ensure that students in even the most remote places could access quality education. Royal Edu Hub is built on the belief that education should be limitless, inclusive, and empowering — for both students and teachers alike."
                </blockquote>
                
                <div className="text-center">
                  <p className="text-white font-semibold text-body-primary">
                    — Francis K Siby
                  </p>
                  <p className="text-white/70 text-body-secondary mt-2">
                    Founder & CEO
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Company Work Environment Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="max-w-6xl mx-auto mt-16"
            >
              <div className="text-center mb-12">
                <h3 className="text-h2 text-white mb-4">
                  Our{" "}
                  <span className="brand-gradient">
                    Work Environment
                  </span>
                </h3>
                <p className="text-body-primary text-white/80 max-w-2xl mx-auto">
                  Experience the collaborative and innovative workspace where our team creates exceptional educational experiences.
                </p>
              </div>

              {/* Work Environment Images Grid - Responsive 4 Image Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {/* Reception Area */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-orange-500/30 transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/office/IMG_20250730_130720.webp"
                      alt="Royal Edu Hub Reception Area"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-white font-semibold text-sm lg:text-base mb-1">Reception Area</h4>
                    <p className="text-white/80 text-xs lg:text-sm">Modern welcoming entrance</p>
                  </div>
                </motion.div>

                {/* Waiting Lounge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-orange-500/30 transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/office/IMG_20250801_135546.webp"
                      alt="Royal Edu Hub Waiting Lounge"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-white font-semibold text-sm lg:text-base mb-1">Waiting Lounge</h4>
                    <p className="text-white/80 text-xs lg:text-sm">Comfortable seating area</p>
                  </div>
                </motion.div>

                {/* Meeting Room */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-orange-500/30 transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/office/office2-1.webp"
                      alt="Royal Edu Hub Meeting Room"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-white font-semibold text-sm lg:text-base mb-1">Meeting Room</h4>
                    <p className="text-white/80 text-xs lg:text-sm">Collaborative discussion space</p>
                  </div>
                </motion.div>

                {/* Front Office Desk */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-orange-500/30 transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/office/office3-1.webp"
                      alt="Royal Edu Hub Front Office Desk"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h4 className="text-white font-semibold text-sm lg:text-base mb-1">Front Office Desk</h4>
                    <p className="text-white/80 text-xs lg:text-sm">Administrative workspace</p>
                  </div>
                </motion.div>
              </div>


            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section - Blue tone to blend with Story */}
      <section id="mission" className="py-20 bg-gradient-to-b from-slate-950 to-black scroll-mt-28 md:scroll-mt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-3 brand-bg-gradient brand-border border rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
              <Target className="w-5 h-5 brand-text" />
              <span className="text-body-primary font-semibold brand-text">
                Our Mission
              </span>
            </div>
            
            <h2 className="text-about-title text-white mb-6">
              Redefining Online Learning with{" "}
              <span className="brand-gradient">
                Smart Education
              </span>
            </h2>
            
            <p className="text-body-primary text-white/80 max-w-3xl mx-auto">
              Today, Royal Edu Hub stands at the forefront of modern online education, ensuring that every student receives personalized guidance, interactive learning, and a strong foundation for academic success.
            </p>
          </motion.div>

          {/* Values Grid - Fixed alignment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="h-full"
                >
                  <div className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-orange-500/50 transition-all duration-500 h-full">
                    <div className="flex items-start space-x-4 h-full">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 flex-shrink-0">
                        <Icon className="w-6 h-6 text-orange-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg mb-2">{value.title}</h3>
                        <p className="text-white/70 text-sm leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section - 5 Core Members with Hover Effects */}
      <section id="team" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden scroll-mt-28 md:scroll-mt-36">
        {/* Simplified Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent animate-pulse"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent animate-pulse delay-1000"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent animate-pulse delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-3 brand-bg-gradient brand-border border rounded-full px-6 py-3 mb-8 backdrop-blur-sm">
              <Users className="w-5 h-5 brand-text" />
              <span className="text-body-primary font-semibold brand-text">
                Meet Our Core Team
              </span>
            </div>
            
            <h2 className="text-about-title text-white mb-6">
              The Minds Behind{' '}
              <span className="brand-gradient">
                Royal Edu Hub
              </span>
            </h2>
            
            <p className="text-body-primary text-white/80 max-w-3xl mx-auto mb-4">
              Our dedicated team of <span className="brand-text font-semibold">5 core leaders</span> and <span className="brand-text font-semibold">500+ expert faculty members</span> are committed to your success.
            </p>
          </motion.div>

          {/* Team Grid - 3D Flip Cards */}
          <div className="max-w-6xl mx-auto">
            {/* Desktop: All 5 cards in one row (lg:5), Tablet: 3 per row (md:3), Mobile: 1 per row */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {["ceo","coo","cto","cmo","creative"].map((pos, idx) => {
                const member = teamMembers.find(m => m.position === pos);
                const Icon = member?.icon;
                const isFlipped = activeCardId === member?.id;
                if (!member) return null;
                return (
                  <motion.div
                    key={pos}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                    className="group relative w-full max-w-xs mx-auto"
                  >
                    {/* Image Card with Flip Animation */}
                    <div 
                      className={`relative w-full h-[320px] sm:h-[360px] perspective-1000 cursor-pointer mb-6 ${
                        member.isCEO ? 'ring-2 ring-orange-500/40 ring-offset-0 rounded-2xl' : ''
                      }`}
                      style={{ perspective: '1000px' }}
                      onClick={() => toggleCardFlip(member.id)}
                    >
                      <div 
                        className={`relative w-full h-full flip-card ${
                          isFlipped ? 'rotate-y-180' : ''
                        }`}
                        style={{ 
                          transformStyle: 'preserve-3d',
                          transition: 'transform 0.7s cubic-bezier(0.4, 0.0, 0.2, 1)'
                        }}
                      >
                        {/* Front Side - Clean Image */}
                        <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden glass-effect border border-white/10 hover:border-orange-500/40 transition-all duration-300" style={{ backfaceVisibility: 'hidden' }}>
                          {member.image ? (
                            <img src={member.image} alt={`${member.name} - ${member.role}`} className="absolute inset-0 w-full h-full object-cover object-top" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
                              {Icon && <Icon className="w-16 h-16 sm:w-20 sm:h-20 brand-text" />}
                            </div>
                          )}
                        </div>
                        {/* Back Side - Work Details */}
                        <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden glass-effect border border-white/10 transition-all duration-300 rotate-y-180" style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}>
                          <div className="w-full h-full p-4 sm:p-5 flex flex-col items-center justify-center text-center">
                            <h4 className="text-white font-bold text-sm sm:text-base leading-snug mb-2 break-words max-w-[95%]">{member.name}</h4>
                            <p className="text-orange-400 font-semibold text-xs sm:text-sm leading-snug mb-3 break-words max-w-[95%]">{member.role}</p>
                            <p className="text-white/80 text-xs sm:text-sm leading-relaxed break-words max-w-[95%] line-clamp-6">
                              {member.workDescription}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                      
                    {/* Name and Position - Below the image card */}
                    <div className="text-center mt-4">
                      <h3 className="text-white font-bold text-base sm:text-lg mb-2 break-words max-w-[95%] mx-auto">{member.name}</h3>
                      <p className="text-orange-400 font-semibold text-sm sm:text-base mb-2 leading-snug break-words max-w-[95%] mx-auto">{member.role}</p>
                      <p className="text-white/60 text-xs">Tap image for work details</p>
                    </div>
                  </motion.div>
                );
              })}

              {/* Faculty Card - only on tablet (md), hidden on lg+ and mobile */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="group relative w-full max-w-xs mx-auto hidden md:block lg:hidden"
              >
                {/* Faculty Icon Container - Matching team card dimensions */}
                <div className="relative w-full h-[320px] sm:h-[360px] perspective-1000 mb-6">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden glass-effect border border-white/10 hover:border-orange-500/40 transition-all duration-300 bg-gradient-to-br from-blue-500/15 to-indigo-500/15 flex items-center justify-center">
                    <GraduationCap className="w-20 h-20 sm:w-24 sm:h-24 text-orange-400" />
                  </div>
                </div>
                
                {/* Faculty info below - Matching team card text styling */}
                <div className="text-center mt-4">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">Expert Faculty</h3>
                  <p className="text-orange-400 font-semibold text-sm sm:text-base mb-2">500+ Qualified Educators</p>
                  <p className="text-white/60 text-xs">Specialized in all academic subjects</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Faculty Note Section - Only shown on desktop xl screens */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center hidden lg:block"
          >
            <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-orange-500/50 transition-all duration-500 max-w-2xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 mb-6">
                  <GraduationCap className="w-12 h-12 text-orange-400" />
                </div>
                <h3 className="text-h3 text-white font-semibold mb-4">Plus 500+ Expert Faculty</h3>
                <p className="text-body-secondary text-white/70 leading-relaxed">
                  Our extensive network of qualified educators specializing in Physics, Chemistry, Mathematics, Biology, and all academic subjects.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Moved mobile/tablet and faculty note blocks inside the Team section to maintain background and responsiveness */}

  </div>
);
};

export default AboutPage;