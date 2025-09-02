import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Star
} from 'lucide-react';

const WhyChooseUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "What makes Royal Edu Hub different from other online tutoring platforms?",
      answer: "We focus on personalized, one-to-one coaching with expert tutors, live interactive classes, and a cutting-edge LMS platform. Our approach is not 'one-size-fits-all' - we customize lesson plans to match each student's unique learning pace and understanding."
    },
    {
      question: "Which syllabi do you support?",
      answer: "We provide expert coaching for CBSE, ICSE, and State syllabus, ensuring that every student gets the attention they deserve regardless of their educational board."
    },
    {
      question: "What subjects do you offer coaching for?",
      answer: "We specialize in guiding Class 10 & 12 students with expert coaching in Mathematics, Science (Physics, Chemistry, Biology), English, Social Science, and more, ensuring thorough concept understanding."
    },
    {
      question: "How does your Learning Management System work?",
      answer: "Our LMS platform provides a structured learning experience with organized content delivery, progress tracking, recorded sessions, and interactive tools for smarter and more organized learning."
    },
    {
      question: "Who can benefit from Royal Edu Hub's coaching?",
      answer: "Students preparing for exams who need personalized coaching and exam strategies, learners who struggle with traditional classroom settings and need an interactive approach, and anyone looking for quality one-to-one educational support."
    },
    {
      question: "What is included in your live interactive classes?",
      answer: "Our live classes include real-time interaction with expert tutors, immediate feedback, interactive tools, personalized attention, and the ability to ask questions and clarify doubts instantly."
    },
    {
      question: "What is your refund policy?",
      answer: "We offer a transparent refund policy. If you're not satisfied with our services within the first 7 days, you can request a full refund. For longer enrollments, we provide pro-rated refunds based on unused sessions."
    },
    {
      question: "Do you offer group classes or only individual sessions?",
      answer: "While we specialize in personalized one-to-one coaching for maximum attention, we also offer small group sessions (2-4 students) for peer learning experiences. You can choose the format that best suits your learning preference and budget."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section ref={ref} className="relative pt-4 sm:pt-6 md:pt-8 lg:pt-10 pb-8 sm:pb-12 md:pb-16 lg:pb-20 bg-[#0f172a] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF6A00]/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#B02000]/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[75vw] max-w-[600px] h-[75vw] max-h-[600px] bg-gradient-radial from-[#FF6A00]/5 to-transparent rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-b from-[#FF6A00]/10 to-[#B02000]/10 border border-[#FF6A00]/20 rounded-full px-6 py-2 mb-6 backdrop-blur-sm"
          >
            <Star className="w-5 h-5 text-[#FF6A00]" />
            <span className="text-white/90 font-medium">Why Choose Us</span>
          </motion.div>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
            Experience the{' '}
            <span className="brand-gradient">
              Royal Edu Hub
            </span>{' '}
            Difference
          </h2>
          
          <p className="text-white/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Education is not just about learning; it's about learning the right way. We redefine online tuition with personalized, expert-led education that builds confidence and ensures academic excellence.
          </p>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-white/70 text-sm sm:text-base md:text-lg">
              Get answers to common questions about our personalized learning approach
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="glass-effect rounded-2xl border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
                >
                  <span className="text-white font-semibold text-sm sm:text-base md:text-lg pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-[#FF6A00]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/60" />
                    )}
                  </div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? 'auto' : 0,
                    opacity: openFAQ === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6A00] mt-0.5 flex-shrink-0" />
                        <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;