import React, { useRef } from "react";

const PrintModal = ({ content, onClose }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=600,height=800');
    if (!printWindow || !printRef.current) return;

    const htmlContent = `
      <html>
        <head>
          <title>Print Preview</title>
          <style>
            body {
              font-family: monospace;
              margin: 0;
              padding: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              padding: 4px;
              text-align: left;
              border: 1px solid #ddd;
              font-size: 12px;
            }
            img {
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
          ${printRef.current.innerHTML}
          <script>
            window.onload = function () {
              window.print();
              window.onafterprint = function () { window.close(); };
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[320px] p-4 max-h-[90vh] overflow-y-auto">
        <div ref={printRef} id="printable">
          {content}
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="text-sm px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="text-sm px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintModal;