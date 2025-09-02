import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Local Pinterest icon (inline SVG) to ensure compatibility
const PinterestIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    aria-hidden="true"
    {...props}
  >
    <path d="M12 2C6.486 2 2 6.206 2 11.5c0 3.912 2.473 7.244 5.945 8.45-.082-.717-.156-1.819.032-2.604.17-.723 1.104-4.602 1.104-4.602s-.282-.57-.282-1.41c0-1.321.76-2.309 1.708-2.309.806 0 1.195.6 1.195 1.318 0 .804-.513 2.006-.778 3.122-.222.942.472 1.711 1.4 1.711 1.68 0 2.975-1.77 2.975-4.326 0-2.262-1.627-3.842-3.952-3.842-2.692 0-4.276 2.017-4.276 4.104 0 .814.313 1.688.704 2.163.078.096.09.18.066.277-.073.303-.241.942-.273 1.074-.043.18-.141.219-.33.133-1.23-.57-2-2.36-2-3.801 0-3.094 2.251-5.935 6.49-5.935 3.406 0 6.061 2.426 6.061 5.669 0 3.388-2.141 6.121-5.118 6.121-1 0-1.941-.52-2.263-1.137l-.616 2.35c-.223.861-.826 1.939-1.231 2.597.928.287 1.911.443 2.935.443 5.514 0 10-3.71 10-9.004C22 6.206 17.514 2 12 2z" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about', scrollToTop: true },
      { name: 'Our Mission', href: '/about#mission' },
      { name: 'Team', href: '/about#team' },
      { name: 'Careers', href: '/careers' }
    ],
    services: [
      { name: 'Online Classes', href: '#services' },
      { name: '1:1 Coaching', href: '#services' },
      { name: 'Nano Batch', href: '#services' },
      { name: 'Offline Batch', href: '#services' }
    ],
    support: [
      { name: 'Help Center', href: '/help-center' },
      { name: 'Contact Us', href: '/contact-us' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/p/Royal-Edu-Hub-61562615087896/', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/royaleduhubofficial/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/royal-edu-hub/?viewAsMember=true', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://www.youtube.com/channel/UCtPr-9f-14Nk--tn4j5y13A/videos', label: 'YouTube' },
    { icon: PinterestIcon, href: 'https://in.pinterest.com/royaleduhub24/', label: 'Pinterest' }
  ];

  return (
    <footer className="bg-black/50 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* Company Info */}
          <div className="lg:col-span-2 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold bg-gradient-to-b from-[#FF6A00] to-[#B02000] bg-clip-text text-transparent mb-3">
                Royal Edu Hub
              </h3>
              <p className="text-white/70 mb-4 text-sm leading-relaxed">
                Your gateway to global success through personalized online education. 
                Expert tutors, interactive classes, and comprehensive study material.
              </p>
              
              <div className="space-y-3">
                {/* Phone block with two numbers */}
                <div className="relative">
                  <Phone className="w-4 h-4 bg-gradient-to-b from-[#FF6A00] to-[#B02000] bg-clip-text text-transparent absolute -left-6 top-0" />
                  <div>
                    <span className="text-sm font-semibold block text-white">Contact Us</span>
                    <a href="tel:+917034111684" className="text-white/70 text-sm block">+91 70341 11684</a>
                    <a href="tel:+918794256411" className="text-white/70 text-sm block">+91 87942 56411</a>
                  </div>
                </div>
                {/* Email */}
                <div className="relative">
                  <Mail className="w-4 h-4 bg-gradient-to-b from-[#FF6A00] to-[#B02000] bg-clip-text text-transparent absolute -left-6 top-0" />
                  <div>
                    <span className="text-sm font-semibold block text-white">Mail ID</span>
                    <a href="mailto:royaleduhub24@gmail.com" className="text-white/70 text-sm">royaleduhub24@gmail.com</a>
                  </div>
                </div>
                
                {/* Main Office */}
                <div className="relative space-y-1">
                  <MapPin className="w-4 h-4 bg-gradient-to-b from-[#FF6A00] to-[#B02000] bg-clip-text text-transparent absolute -left-6 top-0" />
                  <div>
                    <span className="text-sm font-semibold block text-white">Main Office:</span>
                    <span className="text-white/70 text-sm">Kochi, Kerala, India</span>
                  </div>
                </div>
                
                {/* Branch Office */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Royal%20Complex%2C%20Kaithavana%20Jn%2C%20Pazhaveedu%2C%20Alappuzha%2C%20Kerala%20688003%2C%20India"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Branch Office in Google Maps"
                  className="block relative space-y-1 no-underline cursor-pointer"
                >
                  <MapPin className="w-4 h-4 bg-gradient-to-b from-[#FF6A00] to-[#B02000] bg-clip-text text-transparent absolute -left-6 top-0" />
                  <div>
                    <span className="text-sm font-semibold block text-white">Branch Office:</span>
                    <span className="text-white/70 text-sm">Royal Complex, Kaithavana Jn,</span>
                    <span className="text-white/70 text-sm block">Pazhaveedu, Alappuzha,</span>
                    <span className="text-white/70 text-sm block">Kerala 688003, India</span>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Company Links */}
          {/* Link Groups Wrapper: ensures mobile order/layout while preserving desktop columns */}
          <div className="md:col-span-2 lg:col-span-3 w-full">
             <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:gap-8">
              {/* Company (left) */}
              <div className="col-span-1 order-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h4 className="text-base font-semibold bg-gradient-to-b from-[#FF6A00] to-[#B02000] bg-clip-text text-transparent mb-4">Company</h4>
                  <ul className="space-y-2">
                    {footerLinks.company.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault();
                            try { sessionStorage.setItem('footerSupportPreloader', '1'); } catch (_) {}
                            
                            // Always trigger preloader animation for footer navigation
                            const event = new CustomEvent('app:trigger-loader', {
                              detail: { duration: 1500 }
                            });
                            window.dispatchEvent(event);
                            
                            // Enhanced navigation logic for About Us and Mission links
                            if (link.scrollToTop && window.location.pathname === '/about') {
                              // If already on about page and clicking About Us, scroll to top after animation
                              setTimeout(() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }, 200);
                            } else if (link.href.includes('#') && window.location.pathname === '/about') {
                              // If already on about page and clicking hash link, scroll to section after animation
                              setTimeout(() => {
                                const hash = link.href.split('#')[1];
                                const element = document.getElementById(hash);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }, 200);
                            } else {
                              // Navigate to the page (will handle scrolling via AboutPage useEffect)
                              navigate(link.href);
                            }
                          }}
                          className="text-white/70 hover:bg-gradient-to-b from-[#FF6A00] to-[#B02000] bg-clip-text text-transparent transition-colors duration-300 text-sm block"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Support (right of Company on mobile) */}
              <div className="col-span-1 order-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h4 className="text-base font-semibold bg-gradient-to-b from-[#FF6A00] to-[#B02000] bg-clip-text text-transparent mb-4">Support</h4>
                  <ul className="space-y-2">
                    {footerLinks.support.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault();
                            try { sessionStorage.setItem('footerSupportPreloader', '1'); } catch (_) {}
                            
                            // Always trigger preloader animation for footer navigation
                            const event = new CustomEvent('app:trigger-loader', {
                              detail: { duration: 1500 }
                            });
                            window.dispatchEvent(event);
                            
                            navigate(link.href);
                          }}
                          className="text-white/70 hover:bg-gradient-to-b from-[#FF6A00] to-[#B02000] bg-clip-text text-transparent transition-colors duration-300 text-sm block"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Services below on mobile; normal on lg */}
              <div className="col-span-2 order-3 md:order-none md:col-span-1 lg:order-none lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h4 className="text-base font-semibold bg-gradient-to-b from-[#FF6A00] to-[#B02000] bg-clip-text text-transparent mb-4">Services</h4>
                  <ul className="space-y-2">
                    {footerLinks.services.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.href}
                          className="text-white/70 hover:bg-gradient-to-b from-[#FF6A00] to-[#B02000] bg-clip-text text-transparent transition-colors duration-300 text-sm block"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End grid */}

      {/* Social Links - above credits bar; centered on mobile, left on tablet/desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-3 sm:mt-5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center md:justify-start">
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 bg-white/10 rounded-full hover:bg-orange-500 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-white/70 hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom bar - credits only; centered on mobile, right-aligned on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="border-t border-white/10 mt-3 sm:mt-5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-16 py-4 flex items-center justify-center">
            <div className="text-center lg:ml-auto lg:mr-0">
              <p className="text-white/70 text-xs">
                <a
                  href="/terms"
                  title="View Terms of Service"
                  aria-label="View Terms of Service"
                  className="transition-colors duration-200 underline-offset-2 cursor-pointer hover:underline hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-b from-[#FF6A00] to-[#B02000]"
                  onClick={(e) => {
                    e.preventDefault();
                    try { sessionStorage.setItem('footerSupportPreloader', '1'); } catch (_) {}
                    
                    // Always trigger preloader animation for footer navigation
                    const event = new CustomEvent('app:trigger-loader', {
                      detail: { duration: 1500 }
                    });
                    window.dispatchEvent(event);
                    
                    navigate('/terms');
                  }}
                >
                  © {currentYear} Royal Edu Hub. All rights reserved.
                </a>
              </p>
              <p className="text-white/50 text-xs mt-0.5 leading-tight text-center">
                Designed with ❤️ for better education<br />
                <a
                  href="https://www.linkedin.com/in/jeswin-thomas-jestin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 hover:underline text-white/60 hover:text-white transition-colors"
                >
                  Jeswin Thomas Jestin
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;