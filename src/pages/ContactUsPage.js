import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import {
  BUSINESS_NAME,
  PRIMARY_PHONE,
  SECONDARY_PHONE,
  PRIMARY_PHONE_TEL,
  SECONDARY_PHONE_TEL,
  EMAIL,
  ADDRESS,
} from '../constants/nap';

// Local Pinterest icon (inline SVG) to ensure compatibility (same as Footer)
const PinterestIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    aria-hidden="true"
    {...props}
  >
    <path d="M12 2C6.486 2 2 6.206 2 11.5c0 3.912 2.473 7.244 5.945 8.45-.082-.717-.156-1.819.032-2.604.17-.723 1.104-4.602 1.104-4.602s-.282-.57-.282-1.41c0-1.321.76-2.309 1.708-2.309.806 0 1.195.6 1.195 1.318 0 .804-.513 2.006-.778 3.122-.222.942.472 1.711 1.4 1.711 1.68 0 2.975-1.77 2.975-4.326 0-2.262-1.627-3.842-3.952-3.842-2.692 0-4.276 2.017-4.276 4.104 0 .814.313 1.688.704 2.163.078.096.09.18.066.277-.073.303-.241.942-.273 1.074-.043.18-.141.219-.33.133-1.23-.57-2-2.36-2-3.801 0-3.094 2.251-5.935 6.49-5.935 3.406 0 6.061 2.426 6.061 5.669 0 3.388-2.141 6.121-5.118 6.121-1 0-1.941-.52-2.263-1.137l-.616 2.35c-.223.861-.826 1.939-1.231 2.597.928.287 1.911.443 2.935.443 5.514 0 10-3.71 10-9.004C22 6.206 17.514 2 12 2z" />
  </svg>
);

const ContactUsPage = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/p/Royal-Edu-Hub-61562615087896/', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/royaleduhubofficial/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/royal-edu-hub/?viewAsMember=true', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://www.youtube.com/channel/UCtPr-9f-14Nk--tn4j5y13A/videos', label: 'YouTube' },
    { icon: PinterestIcon, href: 'https://in.pinterest.com/royaleduhub24/', label: 'Pinterest' }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-8"
        >
          <span className="bg-gradient-to-b from-[#FF6A00] to-[#B02000] bg-clip-text text-transparent">Contact Us</span>
        </motion.h1>

        <div className="space-y-8 text-white/80 text-sm sm:text-[15px] leading-relaxed">
          {/* Phone Numbers */}
          <section className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-white font-semibold text-base sm:text-lg mb-1">Contact Numbers</h2>
                <div className="space-y-0.5">
                  <a href={`tel:${PRIMARY_PHONE_TEL}`} className="text-white/80 hover:text-white transition-colors block p-tel">{PRIMARY_PHONE}</a>
                  <a href={`tel:${SECONDARY_PHONE_TEL}`} className="text-white/80 hover:text-white transition-colors block p-tel">{SECONDARY_PHONE}</a>
                </div>
              </div>
            </div>
          </section>

          {/* Email */}
          <section className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-white font-semibold text-base sm:text-lg mb-1">Mail ID</h2>
                <a href={`mailto:${EMAIL}`} className="text-white/80 hover:text-white transition-colors u-email">{EMAIL}</a>
              </div>
            </div>
          </section>

          {/* Offices */}
          <section className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-white font-semibold text-base sm:text-lg mb-1">Main Office</h2>
                <p className="text-white/70">Kochi, Kerala, India</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="text-white font-semibold text-base sm:text-lg mb-1">Branch Office</h2>
                <address className="text-white/70 leading-snug not-italic h-card">
                  <span className="p-name sr-only">{BUSINESS_NAME}</span>
                  <span className="p-adr">
                    <span className="p-street-address">{ADDRESS.streetAddressLine1}</span>
                    <br />
                    <span className="p-street-address">{ADDRESS.streetAddressLine2}</span>
                    <br />
                    <span className="p-region">{ADDRESS.regionLine}</span>
                  </span>
                  <a
                    href={ADDRESS.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-sm text-orange-400 hover:text-orange-300 underline underline-offset-2 u-url"
                  >
                    View on Google Maps
                  </a>
                </address>
              </div>
            </div>
          </section>

          {/* Social Media */}
          <section className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6">
            <h2 className="text-white font-semibold text-base sm:text-lg mb-3">Connect with us</h2>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <s.icon className="w-4 h-4 text-white/80" />
                  <span className="text-white/80 text-sm">{s.label}</span>
                </a>
              ))}
            </div>
            <p className="text-white/50 text-xs mt-4">© {currentYear} Royal Edu Hub</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
