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
    return () => window.removeEventListener("resize", measure);
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
        className="w-full h-[70vh] sm:h-[75vh] bg-black/30 overflow-y-auto overscroll-contain"
        style={{ touchAction: "pan-x pan-y" }}
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