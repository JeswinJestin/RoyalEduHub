import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star } from 'lucide-react';
import { getTimeAgo } from '../../utils/timeUtils';

const testimonials = [
    {
      name: 'Shaine Mathew. S',
      grade: 'Google Review',
      rating: 5,
      text: "Royal Edu Hub's nano-batch classes are perfect for students who want personal attention and concept clarity. My grades improved within weeks of joining. Special thanks to the tutors for their patience and dedication!",
      avatar: '/testimonials/shinemathews.png',
      reviewDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      profileColor: '#4F46E5'
    },
    {
      name: 'Chris Ann',
      grade: 'Google Review',
      rating: 5,
      text: 'Very professional coaching! Royal Edu Hub offers individual tuition sessions and small group batches that ensure maximum learning. I highly recommend them for board exam preparation in Physics, Chemistry, and Maths.',
      avatar: '/testimonials/chrisann.png',
      reviewDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      profileColor: '#059669'
    },
    {
      name: 'Ashisaa Ash',
      grade: 'Google Review',
      rating: 5,
      text: 'Royal Edu Hub offers the best online tuition for Class 10 and 12 students. I joined their Physics and Maths nano-batch classes and loved the interactive teaching style. The individual attention and constant feedback really helped me score higher in my board exams.',
      avatar: '/testimonials/ashisaaash.png',
      reviewDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      profileColor: '#DC2626'
    },
    {
      name: 'Vinayak Chakraborty',
      grade: 'Google Review',
      rating: 5,
      text: 'I joined Royal Edu Hub for Class 12 Chemistry and Maths tuition and was amazed by how well they explained each topic. The LMS system, regular tests, and individual mentoring kept me motivated. Highly recommend for students aiming for top marks in board exams.',
      avatar: '/testimonials/vinayakchakraborty.png',
      reviewDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      profileColor: '#7C3AED'
    },
    {
      name: 'Christeena',
      grade: 'Google Review',
      rating: 5,
      text: 'Fantastic tuition experience! The academic management, flexible scheduling, and highly qualified teachers made it easy for me to stay consistent. Whether for Science, Maths, or board exam prep, Royal Edu Hub is the right choice.',
      avatar: null,
      reviewDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      profileColor: '#EA580C'
    },
    {
      name: 'Nikhil Kumar',
      grade: 'Google Review',
      rating: 5,
      text: "My daughter attended Royal Edu Hub's Class 12 online Physics tuition and scored much better than expected. The individual attention, live interactive sessions, and doubt-clearing support are top-notch. Best place for CBSE, ICSE, and Kerala syllabus students who want quality tuition in Alappuzha.",
      avatar: null,
      reviewDate: new Date(Date.now() - 14 * 60 * 60 * 1000), // 14 hours ago
      profileColor: '#0891B2'
    },
    {
      name: 'Prince P Abraham',
      grade: 'Google Review',
      rating: 5,
      text: 'Royal Edu Hub is truly the best choice for Class 10 and Class 12 students. I joined for offline Physics and Chemistry tuition in Alappuzha and also attended their online Maths classes. The lessons are well-structured, the tutors explain every concept clearly, and the small batches ensure personal attention. Highly recommended for both online and offline learning.',
      avatar: '/testimonials/princepabraham.png',
      reviewDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      profileColor: '#16A34A'
    },
    {
      name: 'Jiaelsa Abraham',
      grade: 'Google Review',
      rating: 5,
      text: 'I was struggling with Class 12 Physics before joining Royal Edu Hub. Their experienced faculty, structured study materials, and live doubt-solving sessions made all the difference. If you need the best tuition for board exam preparation, this is the place.',
      avatar: null,
      reviewDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      profileColor: '#BE185D'
    }
  ];

const Testimonials = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  // Marquee refs/state
  const marqueeRef = useRef(null);
  const [isMarqueeHovered, setIsMarqueeHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isUserControlled, setIsUserControlled] = useState(false);
  const [controlledOffset, setControlledOffset] = useState(0);
  const resumeTimerRef = useRef(null);

  // Update time every minute to keep timestamps fresh
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Compute marquee travel distance and duration (desktop + mobile)
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const compute = () => {
      // Because we render the array twice for seamless loop, we only need to travel half the scrollWidth
      const halfWidth = Math.max(0, Math.round(el.scrollWidth / 2));
      el.style.setProperty('--scroll-width', `-${halfWidth}px`);
      const speedPxPerSec = 60;
      const durationSec = Math.max(20, Math.round(halfWidth / speedPxPerSec));
      el.style.setProperty('--animation-duration', `${durationSec}s`);
    };

    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  // Dot click: pause animation and snap to selected card
  const handleDotClick = (index) => {
    const track = marqueeRef.current;
    if (!track) return;
    const child = track.children[index]; // choose from first half
    if (!child) return;
    const offset = child.offsetLeft;
    setActiveIndex(index);
    setIsUserControlled(true);
    setControlledOffset(offset);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsUserControlled(false);
    }, 4000);
  };

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);


  return (
    <section id="testimonials" className="py-12 sm:py-16 bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {} }
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Student <span className="brand-gradient">Testimonials</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Hear what our students and parents have to say about their learning experience with us.
          </p>
        </motion.div>

        {/* Modern marquee carousel (no arrows/dots) */}
        <div
          className="relative overflow-hidden rounded-2xl"
          onMouseEnter={() => setIsMarqueeHovered(true)}
          onMouseLeave={() => setIsMarqueeHovered(false)}
          onTouchStart={() => setIsMarqueeHovered(true)}
          onTouchEnd={() => setIsMarqueeHovered(false)}
        >
          {/* Gradient edges removed per request to show full content on desktop */}

          <div
            ref={marqueeRef}
            className="flex gap-4 sm:gap-6 lg:gap-8 will-change-transform"
            style={{
              animation: isUserControlled ? 'none' : 'scroll var(--animation-duration, 30s) linear infinite',
              animationPlayState: (isMarqueeHovered || isUserControlled) ? 'paused' : 'running',
              transform: isUserControlled ? `translateX(-${controlledOffset}px)` : undefined
            }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={`${testimonial.name}-${index}`}
                className="glass-effect p-4 sm:p-6 rounded-2xl lg:rounded-lg hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl flex flex-col h-full min-w-[16rem] sm:min-w-[20rem] lg:min-w-[24rem] xl:min-w-[26rem]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % testimonials.length) * 0.04 }}
              >
                {/* Header with Avatar and Info */}
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full mr-3 sm:mr-4 flex items-center justify-center border border-white/20 flex-shrink-0 overflow-hidden" style={{ backgroundColor: testimonial.profileColor }}>
                    {testimonial.avatar ? (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full object-cover rounded-full"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = testimonial.name.charAt(0);
                        }}
                      />
                    ) : (
                      <span className="text-white font-semibold text-sm sm:text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-lg font-semibold text-white truncate">{testimonial.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm text-white/60">{testimonial.grade}</p>
                      <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium flex-shrink-0">
                        Google
                      </span>
                    </div>
                    <p className="text-xs text-white/40 mt-1">{getTimeAgo(testimonial.reviewDate, currentTime)}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current mr-1" />
                  ))}
                  <span className="text-white/60 text-xs sm:text-sm ml-2">({testimonial.rating}.0)</span>
                </div>

                {/* Review Text */}
                <div className="relative flex-1">
                  <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10">
                    <p className="text-white/90 text-xs sm:text-sm leading-relaxed line-clamp-4 sm:line-clamp-5 lg:line-clamp-6">
                      <span className="text-orange-400/60 text-base sm:text-lg font-serif">"</span>{testimonial.text}<span className="text-orange-400/60 text-base sm:text-lg font-serif">"</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Small dot controls (no arrows) */}
          <div className="mt-4 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={`dot-${i}`}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => handleDotClick(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${i === activeIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/60'}`}
              />
            ))}
          </div>
        </div>

        {/* Keyframes required for marquee and subtle effects */}
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(var(--scroll-width)); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Testimonials;