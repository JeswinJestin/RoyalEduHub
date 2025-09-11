import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Award, 
  Star, 
  ArrowRight
} from 'lucide-react';

const Courses = ({ hideHeader = false }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: 'Class 5 to 8 – Foundation Courses',
      description: 'Strong foundation building with comprehensive coverage of CBSE, ICSE, ISC, NIOS & State Board curriculum. Focus on Maths, Science & Reasoning with fun, concept-based teaching approach.',
      icon: BookOpen,
      highlights: [
        'Full CBSE, ICSE, ISC, NIOS & State Board coverage',
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
      icon: Award,
      highlights: [
        'Full CBSE, ICSE, ISC, NIOS & State Board coverage',
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
      icon: Star,
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

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {!hideHeader && (
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-primary bg-clip-text text-transparent border border-primary-500/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" />
              <span className="text-sm sm:text-base font-semibold text-primary-500">
                Our Courses
              </span>
            </div>
            
            <h2 className="text-h1 mb-4 sm:mb-6 leading-tight px-4">
              Comprehensive{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Learning Programs
              </span>
            </h2>
            
            <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed px-4">
              From foundational learning to competitive exam preparation, we offer structured courses 
              designed to help students excel at every academic level.
            </p>
          </motion.div>
        )}

        {/* Simplified Course Cards for Homepage */}
        <div className="grid gap-6 lg:gap-8">
          {courses.map((course, index) => {
            const IconComponent = course.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 border border-blue-500/20 rounded-2xl p-6 lg:p-8 hover:border-blue-400/30 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/15 to-indigo-500/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-8 h-8 text-orange-500" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 leading-tight">
                      {course.title}
                    </h3>
                    <p className="text-base text-white/80 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Learn More Button */}
                  <div className="flex-shrink-0 mt-4 lg:mt-0">
                    <button 
                      onClick={() => navigate(`/courses?course=${course.id}`)}
                      className="btn-secondary btn-compact rounded-lg font-medium cursor-pointer flex items-center justify-center"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Courses;