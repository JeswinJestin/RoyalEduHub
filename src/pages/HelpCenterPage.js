import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ title, items }) => (
  <section className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6">
    <h2 className="text-white text-base sm:text-lg font-semibold mb-3">{title}</h2>
    <ul className="text-white/70 text-sm space-y-2 list-disc list-inside">
      {items.map((it, idx) => (
        <li key={idx}>{it}</li>
      ))}
    </ul>
  </section>
);

const HelpCenterPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-b from-[#FF6A00] to-[#B02000] bg-clip-text text-transparent">Help Center</span>
          </motion.h1>
          <p className="text-white/70 text-sm mt-3">Find quick answers and guidance for getting started, managing classes, billing, and more.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Section title="Getting Started" items={[
            'Create your learning plan',
            'Choosing the right course & batch',
            'Account setup and profile'
          ]} />

          <Section title="Classes & Scheduling" items={[
            'Book, reschedule, or cancel a class',
            'Online vs. 1:1 vs. Nano vs. Offline',
            'Attendance and recordings'
          ]} />

          <Section title="Billing & Payments" items={[
            'Pricing and invoices',
            'Offers and coupons',
            'Refunds and cancellations'
          ]} />

          <Section title="Technical Support" items={[
            'Audio/video troubleshooting',
            'Supported devices and browsers',
            'Login and password help'
          ]} />

          <Section title="Policies" items={[
            'Privacy Policy basics',
            'Terms of Service overview',
            'Certificate and results policy'
          ]} />

          <Section title="Contact Support" items={[
            'Raise a query via Contact page',
            'WhatsApp support during business hours',
            'Email: royaleduhub24@gmail.com'
          ]} />
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;