import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
        >
          <span className="bg-gradient-to-b from-[#FF6A00] to-[#B02000] bg-clip-text text-transparent">Privacy Policy</span>
        </motion.h1>

        <div className="flex items-center justify-between mb-6">
          <p className="text-white/60 text-xs sm:text-sm">Last updated: {new Date().getFullYear()}</p>
        </div>

        <div className="space-y-8 text-white/80 text-sm sm:text-[15px] leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">1. Overview</h2>
            <p>
              This Privacy Policy explains how Royal Edu Hub collects, uses, and protects your information when you use our
              Services. We are committed to safeguarding your privacy and using your data responsibly.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">2. Information We Collect</h2>
            <p>
              We may collect personal information such as names, email addresses, phone numbers, grade and subject
              preferences, and communication records. We also collect technical data like device information and usage
              analytics to improve our Services.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">3. How We Use Information</h2>
            <p>
              We use your information to deliver classes, respond to inquiries, personalize learning, enhance safety,
              process payments where applicable, and improve our platform’s performance and reliability.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">4. Sharing and Disclosure</h2>
            <p>
              We do not sell your personal information. We may share data with trusted service providers (such as communication
              or payment platforms) strictly for operational purposes, subject to appropriate safeguards and agreements.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">5. Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your data from unauthorized access,
              alteration, disclosure, or destruction. However, no method of transmission or storage is completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">6. Your Choices and Rights</h2>
            <p>
              You may request access, correction, or deletion of your personal information, subject to legal obligations.
              You can also manage communications preferences by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">7. Children’s Privacy</h2>
            <p>
              Our Services are used by students under adult supervision. We collect only the information necessary for
              educational purposes and take special care to protect data related to minors.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">8. International Transfers</h2>
            <p>
              Your information may be processed in jurisdictions with different data protection laws. We take steps to
              ensure appropriate protection consistent with applicable regulations.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">9. Changes to this Policy</h2>
            <p>
              We may update this Policy to reflect changes in our practices or legal requirements. We will post updates on
              this page and adjust the “Last updated” date accordingly.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg sm:text-xl mb-2">10. Contact Us</h2>
            <p>
              If you have questions about this Policy or our data practices, contact us at
              <span className="text-white"> royaleduhub24@gmail.com</span> or visit the Contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;