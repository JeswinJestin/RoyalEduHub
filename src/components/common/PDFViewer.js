import React, { useState, useCallback, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Download } from "lucide-react";

// Use CDN worker to avoid bundling issues
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const viewerRef = useRef(null);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (viewerRef.current) {
        const w = viewerRef.current.clientWidth;
        setContainerWidth(w > 0 ? w : null);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    // Mobile scroll-chaining fallback for browsers that ignore overscroll-behavior (older iOS Safari)
    const el = viewerRef.current;
    let startY = 0;
    const onTouchStart = (e) => {
      if (!el) return;
      startY = e.touches?.[0]?.clientY ?? 0;
    };
    const onTouchMove = (e) => {
      if (!el) return;
      const currentY = e.touches?.[0]?.clientY ?? 0;
      const deltaY = startY - currentY; // positive when swiping up
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      // When viewer is at boundary, let the page scroll instead of trapping
      if ((atTop && deltaY < 0) || (atBottom && deltaY > 0)) {
        e.preventDefault();
        window.scrollBy({ top: deltaY, left: 0, behavior: "auto" });
      }
    };
    if (el) {
      el.addEventListener("touchstart", onTouchStart, { passive: true });
      el.addEventListener("touchmove", onTouchMove, { passive: false });
    }
    return () => {
      window.removeEventListener("resize", measure);
      if (el) {
        el.removeEventListener("touchstart", onTouchStart);
        el.removeEventListener("touchmove", onTouchMove);
      }
    };
  }, []);

  return (
    <div className="w-full bg-black/30 border border-white/20 rounded-2xl overflow-hidden">
      {/* Toolbar: Only one Download button */}
      <div className="flex items-center justify-end px-3 py-2 bg-black/40 border-b border-white/10">
        <a
          href={file}
          download
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm"
        >
          <Download className="w-4 h-4" />
          Download
        </a>
      </div>

      {/* Content: vertical, fit-width pages for mobile */}
      <div
        ref={viewerRef}
        className="w-full h-[70vh] sm:h-[75vh] bg-black/30 overflow-y-auto overscroll-auto"
        style={{ touchAction: "pan-y", WebkitOverflowScrolling: "touch" }}
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="p-4 text-white/80">Loading brochure…</div>}
          error={<div className="p-4 text-red-300">Failed to load PDF.</div>}
        >
          {Array.from({ length: numPages || 0 }, (_, i) => (
            <Page
              key={`page_${i + 1}`}
              pageNumber={i + 1}
              width={containerWidth || undefined}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              className="my-4"
            />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;