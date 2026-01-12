import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TITLE_MAP = {
  '/': 'Royal Edu Hub — Online Classes | CBSE & ICSE Coaching',
  '/about': 'About Royal Edu Hub | Mission, Team, Vision & Story',
  '/courses': 'Courses | CBSE, ICSE, State Syllabus Live Classes',
  '/services': 'Services | Online Tuition, Doubt Support & Analytics',
  '/contact': 'Contact Royal Edu Hub India | Enquiries & Support Today',
  '/help-center': 'Help Center | FAQs, Policies & Technical Support Guide',
  '/privacy-policy': 'Privacy Policy | Data Protection at Royal Edu Hub India',
  '/terms': 'Terms of Service | Policies at Royal Edu Hub India',
  '/contact-us': 'Contact Us | Address, Phone & Social — Royal Edu Hub',
  '/careers': 'Careers at Royal Edu Hub India | Tutor & Staff Openings',
};

function ensureCanonical(url) {
  try {
    const head = document.head || document.getElementsByTagName('head')[0];
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  } catch (_) {}
}

function setTitleForPath(pathname) {
  const fallback = 'Royal Edu Hub — Online Classes | CBSE & ICSE Coaching';
  const title = TITLE_MAP[pathname] || fallback;
  try {
    document.title = title;
  } catch (_) {}
}

function buildCanonicalUrl(origin, pathname) {
  const cleanPath = pathname || '/';
  return `${origin}${cleanPath}`;
}

export default function SEOManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    setTitleForPath(pathname);
    const isProd = process.env.NODE_ENV === 'production';
    const origin = isProd ? 'https://royaleduhub.com' : window.location.origin;
    const canonical = buildCanonicalUrl(origin, pathname);
    ensureCanonical(canonical);
  }, [pathname]);

  return null;
}

