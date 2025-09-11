import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  ArrowRight,
  Award,
  Target,
  Brain,
  GraduationCap,
  Play,
  Users,
  Star,
  Zap,
  Package
} from 'lucide-react';

const CoursesPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const courseId = params.get('course');
    if (courseId) {
      setSelectedCourseId(parseInt(courseId));
    }
  }, [location.search]);

  const courses = [
    {
      id: 1,
      title: 'Class 5 to 8 – Foundation Courses',
      description: 'Strong foundation building with comprehensive coverage of CBSE, ICSE & State Board curriculum. Focus on Maths, Science & Reasoning with fun, concept-based teaching approach.',
      students: '1,200+',
      icon: BookOpen,
      level: 'Foundation',
      category: 'Classes 5-8',
      highlights: [
        'Full CBSE, ICSE & State Board coverage',
        'Strong basics in Maths, Science & Reasoning',
        'Fun learning with concept-based teaching',
        'Logical thinking through activities & puzzles'
      ],
      features: [
        'Nano batches (3–5 students)',
        'One-on-one doubt support',
        'Monthly review with parents'
      ],
      package: [
        '10+ Live Classes/Month',
        'Notes & Worksheets',
        'LMS & App Access',
        'Add-on: Vedic Maths / Coding Basics'
      ]
    },
    {
      id: 2,
      title: 'Class 9 & 10 – Board Exam Focused Coaching',
      description: 'Comprehensive board exam preparation with expert guidance. Specialized focus on Algebra, Trigonometry, Geometry & Science with regular mock tests and performance tracking.',
      students: '2,500+',
      icon: Award,
      level: 'Secondary',
      category: 'Classes 9-10',
      highlights: [
        'Full CBSE, ICSE & State Board coverage',
        'Focus on Algebra, Trigonometry, Geometry & Science',
        'Regular board-style mock tests'
      ],
      features: [
        'Nano batches for better focus',
        'Expert teachers with board exam experience',
        'Performance tracking & reports'
      ],
      package: [
        'Weekly Tests + Mock Exams',
        'Notes, PYQs & Study Plans',
        'LMS & App Access',
        'Bonus: Career Awareness Sessions'
      ]
    },
    {
      id: 3,
      title: 'Class 11 & 12 – Advanced & Competitive Exam Prep',
      description: 'Advanced learning for Boards + competitive exams (NEET/JEE/CUET). Deep focus on Physics, Chemistry, Biology & Maths with experienced mentors and 24x7 support.',
      students: '3,800+',
      icon: Star,
      level: 'Higher Secondary',
      category: 'Classes 11-12',
      highlights: [
        'Covers every Boards + NEET/JEE/CUET syllabus',
        'Deep focus on Physics, Chemistry, Biology & Maths',
        'Test series with competitive pattern'
      ],
      features: [
        'Experienced NEET/JEE Mentors',
        '24x7 Doubt Support',
        'Monthly Progress Reports'
      ],
      package: [
        '15+ Live Hours Weekly',
        'Chapter-wise Tests',
        'LMS + App Access',
        'Add-on: Pre-exam Crash Courses'
      ]
    }
  ];

  const features = [
    {
      icon: Target,
      title: 'Personalized Learning',
      description: 'Tailored study plans based on individual learning pace and goals'
    },
    {
      icon: Brain,
      title: 'Expert Faculty',
      description: 'Learn from experienced educators with proven track records'
    },
    {
      icon: GraduationCap,
      title: 'Comprehensive Curriculum',
      description: 'Complete syllabus coverage with additional practice materials'
    },
    {
      icon: Play,
      title: 'Interactive Sessions',
      description: 'Engaging live classes with interactive learning experiences'
    }
  ];

  return (
    <div className="min-h-screen bg-blue-black relative">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 sm:space-x-3 brand-bg-gradient brand-border border rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 backdrop-blur-sm">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 brand-text" />
              <span className="text-sm sm:text-base font-semibold brand-text">Our Courses</span>
            </div>
            
            <h1 className="text-about-title text-white mb-4 sm:mb-6 leading-tight">
              {selectedCourseId ? courses.find(c => c.id === selectedCourseId)?.title || 'Course Details' : 'Comprehensive'}{' '}
              <span className="brand-gradient">{selectedCourseId ? '' : 'Learning Programs'}</span>
            </h1>
            
            <p className="text-body-primary text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
              {selectedCourseId
                ? 'Detailed course information and curriculum'
                : "Our programs cover foundational learning basics through advanced topics for students from grades 5 to 12 across all boards. We take a comprehensive approach by assessing each child's unique needs, strengths, and weaknesses to deliver personalized instruction. Our system includes continuous progress tracking and offers flexible learning options - including online, offline, 1-on-1 sessions, and group classes - across all core subjects."
              }
            </p>
            
            {selectedCourseId && (
              <div className="mt-8">
                <button
                  onClick={() => {
                    setSelectedCourseId(null);
                    navigate('/courses');
                  }}
                  className="btn-secondary px-6 py-3 rounded-lg font-medium"
                >
                  ← View All Courses
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-about-title text-white mb-4 sm:mb-6">
              Why Choose{' '}
              <span className="brand-gradient">Our Programs</span>
            </h2>
            <p className="text-body-primary text-white/70 max-w-2xl mx-auto px-4">
              Experience excellence in education with our proven methodologies and expert guidance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-effect rounded-xl p-6 text-center"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500/15 to-indigo-500/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-about-title text-white mb-4 sm:mb-6">
              Our{' '}
              <span className="brand-gradient">Course Offerings</span>
            </h2>
            <p className="text-body-primary text-white/70 max-w-2xl mx-auto px-4">
              Structured learning paths designed to help students excel at every academic level.
            </p>
          </motion.div>

          <div className="space-y-8 lg:space-y-12">
            {(selectedCourseId ? courses.filter(course => course.id === selectedCourseId) : courses).map((course, index) => {
              const IconComponent = course.icon;
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-effect rounded-2xl p-8 lg:p-12"
                >
                  {/* Course Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-orange-500" />
                        </div>
                        <div>
                          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/15 to-indigo-500/15 text-orange-400 text-sm font-medium rounded-full border border-blue-500/30">
                            <span className="sm:inline hidden">{course.category} • {course.level}</span>
                            <span className="sm:hidden inline">
                              {course.category}
                              <br />
                              {course.level}
                            </span>
                          </span>
                        </div>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                        {course.title}
                      </h3>
                      <p className="text-base lg:text-lg text-white/70 leading-relaxed mb-6">
                        {course.description}
                      </p>
                      
                      {/* Student Count */}
                      <div className="flex items-center gap-2 mb-6">
                        <Users className="w-5 h-5 text-orange-400" />
                        <span className="text-white/80 font-medium">{course.students} students enrolled</span>
                      </div>
                    </div>
                  </div>





                  {/* Course Details Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    {/* Highlights */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-orange-400" />
                        Highlights
                      </h4>
                      <div className="space-y-3">
                        {course.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Star className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white/80 text-sm leading-relaxed">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-green-400" />
                        Features
                      </h4>
                      <div className="space-y-3">
                        {course.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Target className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white/80 text-sm leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Package */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5 text-purple-400" />
                        Package
                      </h4>
                      <div className="space-y-3">
                        {course.package.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Award className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white/80 text-sm leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-secondary font-semibold py-4 px-8 rounded-xl flex items-center justify-center gap-2 group/btn"
                    >
                      <span>View Curriculum & Get Started</span>
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </motion.button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-about-title text-white mb-4 sm:mb-6">
              Ready to Start Your{' '}
              <span className="brand-gradient">Learning Journey?</span>
            </h2>
            <p className="text-body-primary text-white/70 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
              Join thousands of students who have achieved their academic goals with our expert guidance and proven methodologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact#contact" className="w-full sm:w-auto">
                <button className="btn-secondary text-base sm:text-lg px-8 py-4 w-full sm:w-auto">
                  Schedule Consultation
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;