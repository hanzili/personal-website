"use client";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

export function PDFViewer() {
  return (
    <div>
      <Document file="/resume.pdf">
        <Page pageNumber={1} />
      </Document>
    </div>
  );
}
