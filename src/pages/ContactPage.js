import React, { useEffect } from 'react';
import Contact from '../components/sections/Contact';

const ContactPage = () => {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Contact />
    </div>
  );
};

export default ContactPage;