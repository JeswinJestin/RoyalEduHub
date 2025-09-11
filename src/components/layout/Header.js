import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Users, Award, Phone } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { id: 'home', label: 'HOME', path: '/', icon: BookOpen },
    { id: 'about', label: 'ABOUT US', path: '/about', icon: Users },
    { id: 'courses', label: 'OUR COURSES', path: '/courses', icon: Award },
    { id: 'services', label: 'SERVICES', path: '/services', icon: Award },
    { id: 'contact', label: 'CONTACT', path: '/contact', icon: Phone },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (path) => {
    setIsMobileMenuOpen(false);
    if (path === '/' && location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        (isScrolled || isMobileMenuOpen)
          ? 'bg-slate-900/80 backdrop-blur-xl shadow-2xl border-b border-white/10'
          : 'bg-transparent'
      }`}
      style={{ pointerEvents: 'auto' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 xl:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3 flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" onClick={handleLogoClick} className="flex items-center ml-0 sm:ml-2 xl:ml-4">
              <div className="w-14 h-14 sm:w-14 sm:h-14 xl:w-16 xl:h-16 flex items-center justify-center">
                <img
                  src="/royal-edu-hub-logo.webp"
                  alt="Royal Edu Hub Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium backdrop-blur-sm ${
                      isActive(item.path)
                        ? 'brand-bg-gradient brand-border border shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-white/15 border border-transparent hover:border-white/20'
                    }`}
                  >
                    <Icon size={16} className={`transition-all duration-300 ${isActive(item.path) ? 'brand-text' : 'text-white hover:brand-text'}`} />
                    <span className={`transition-all duration-300 ${isActive(item.path) ? 'brand-gradient' : 'text-white hover:brand-gradient'}`}>{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Phone Number */}
          <div className="hidden xl:flex items-center text-gray-300 font-medium">
            <Phone className="w-4 h-4 mr-2" />
            7034111683
          </div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="hidden xl:block btn-primary flex-shrink-0 ml-4"
            >
              Free Demo
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="xl:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="xl:hidden bg-slate-900/85 backdrop-blur-xl border-t border-white/20 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 py-6 space-y-4 ">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => handleNavClick(item.path)}
                      className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm ${
                        isActive(item.path)
                          ? 'brand-bg-gradient brand-border border shadow-lg'
                          : 'text-gray-300 hover:text-white hover:bg-white/15 border border-transparent hover:border-white/20'
                      }`}
                    >
                      <Icon size={20} className={`transition-all duration-300 ${isActive(item.path) ? 'brand-text' : 'text-white hover:brand-text'}`} />
                      <span className={`font-medium transition-all duration-300 ${isActive(item.path) ? 'brand-gradient' : 'text-white hover:brand-gradient'}`}>{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full btn-primary mt-6 block text-center"
                >
                  Free Demo
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;