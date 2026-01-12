import React, { Suspense } from "react";
import { motion } from "framer-motion";
// Lazy load PDFViewer to avoid loading pdfjs-dist during prerendering (which breaks react-snap)
const PDFViewer = React.lazy(() => {
  if (navigator.userAgent === 'ReactSnap') {
    return Promise.resolve({ 
      default: () => (
        <div className="p-8 text-center text-white/80">
          <p>Preview available in full version.</p>
          <a href="/Royal Edu hub Brochure.pdf" className="inline-block mt-4 text-blue-400 hover:text-blue-300 underline">
            Download Brochure PDF
          </a>
        </div>
      ) 
    });
  }
  return import('../common/PDFViewer');
});

const BrochureSection = () => {
  const pdfPath = "/Royal Edu hub Brochure.pdf"; // exact name from public folder
  return (
    <section
      id="brochure"
      className="relative w-full overflow-visible bg-gradient-to-br from-slate-900/60 to-blue-950/50 py-10 sm:py-14 md:py-18"
      style={{ zIndex: "auto" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 md:mb-6"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
            <span className="text-white">Explore Our </span>
            <span className="brand-gradient">Program Brochure</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-6 sm:mb-8 md:mb-10"
        >
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto">
            View and download our comprehensive brochure to learn more about our
            programs, teaching methodology, and outcomes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-3 sm:p-4 md:p-5 shadow-2xl"
        >
          <div className="mb-3">
            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white/90">Royal Edu Hub Brochure (PDF)</h3>
          </div>

          <Suspense fallback={<div className="p-8 text-center text-white/60">Loading brochure viewer...</div>}>
            <PDFViewer file={pdfPath} />
          </Suspense>
        </motion.div>
      </div>
    </section>
  );
};

export default BrochureSection;