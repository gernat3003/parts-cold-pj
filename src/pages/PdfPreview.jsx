import React from 'react';

const PdfPreview = ({ pdfUrl }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <iframe
        src={pdfUrl}
        width="70%"
        height="100%"
        className="border-none flex-grow"
        title="PDF Preview"
        style={{ minHeight: '600px' }} // Asegura un mínimo de altura
      ></iframe>
      <div className="flex justify-center mt-4">
        <a
          href={pdfUrl}
          download="invoice.pdf"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Descargar PDF
        </a>
      </div>
    </div>
  );
};

export default PdfPreview;
