import React from 'react';
import { motion } from 'framer-motion';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
        >
          <span className="bg-gradient-to-b from-[#FF6A00] to-[#B02000] bg-clip-text text-transparent">Terms of Service</span>
        </motion.h1>

        <div className="flex items-center justify-between mb-6">
          <p className="text-white/60 text-xs sm:text-sm">Last updated: {new Date().getFullYear()}</p>
        </div>

        <div className="space-y-8 text-white/80 text-sm sm:text-[15px] leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">1. Introduction</h2>
            <p>
              These Terms of Service ("Terms") govern your access to and use of Royal Edu Hub's websites, applications,
              content, learning services, and any related offerings (collectively, the "Services"). By accessing or using our
              Services, you agree to be bound by these Terms. If you are under the age of majority, a parent or legal guardian
              must review and accept these Terms on your behalf.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">2. Eligibility and Accounts</h2>
            <p>
              You may be required to create an account to access certain features. You agree to provide accurate, complete
              information and to keep your credentials secure. Parents or guardians are responsible for supervising
              student accounts created for minors.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">3. Use of Services</h2>
            <p>
              Our Services are intended for personal, non-commercial learning. You agree not to misuse the platform, disrupt
              classes, attempt to access other users' information, or use the Services in a manner that violates applicable
              law or these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">4. Classes, Scheduling, and Attendance</h2>
            <p>
              Class availability, formats (online, 1:1, nano, or offline), schedules, and instructors may change over time.
              We strive to provide timely updates and high-quality sessions. Please arrive on time and maintain respectful
              conduct throughout each class.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">5. Fees, Billing, and Refunds</h2>
            <p>
              Fees and billing cycles are communicated during enrollment. Unless otherwise specified, fees are non-refundable
              once a class or program has commenced. For cancellations prior to start, any refund eligibility will be
              communicated at the time of purchase and may be subject to administrative charges.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">6. Student Conduct and Community Standards</h2>
            <p>
              We maintain a supportive learning environment. Harassment, discrimination, inappropriate language, content
              sharing without permission, or any behavior that disrupts the learning experience is prohibited and may lead to
              suspension or termination of access.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">7. Intellectual Property</h2>
            <p>
              All platform materials, including lessons, recordings, notes, and assessments, are owned by Royal Edu Hub or
              our licensors. You may not copy, distribute, record, or create derivative works from our content without prior
              written consent, except as permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">8. Third-Party Tools and Links</h2>
            <p>
              The Services may integrate third-party tools (e.g., video conferencing, payment gateways). We are not
              responsible for the content, policies, or practices of third parties. Your use of such tools is governed by their
              respective terms and privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">9. Disclaimers</h2>
            <p>
              The Services are provided on an "as is" and "as available" basis. While we strive for accuracy and continuity,
              we do not warrant uninterrupted access, error-free content, or guaranteed outcomes. Your learning progress
              depends on multiple factors including participation and practice.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">10. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Royal Edu Hub and its affiliates shall not be liable for indirect,
              incidental, special, consequential, or punitive damages arising from or related to your use of the Services.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">11. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Royal Edu Hub from any claims, liabilities, damages, losses,
              and expenses, including reasonable legal fees, arising out of or in any way connected with your misuse of the
              Services or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">12. Changes to the Services or Terms</h2>
            <p>
              We may update the Services or these Terms from time to time. Material changes will be communicated via our
              website, app, or email. Continued use after updates constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">13. Contact</h2>
            <p>
              For questions about these Terms, please contact us at <span className="text-white">royaleduhub24@gmail.com</span> or visit the Contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;