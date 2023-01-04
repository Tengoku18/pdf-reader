import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

const ViewPDF = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const handlePages = (param) => {
    setPageNumber((prevPageNumber) => prevPageNumber + param);
  };

  const handlePrevious = () => {
    handlePages(-1);
  };

  const handleNext = () => {
    handlePages(1);
  };
  return (
    <div className="">
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page height={780} pageNumber={pageNumber} />
      </Document>
      <div className="w-full flex  justify-between mb-2">
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <div>
          {pageNumber > 1 && (
            <button
              className="bg-gray-100 py-1 px-1  rounded-md mx-2 "
              onClick={() => {
                handlePrevious();
              }}
            >
              Previous
            </button>
          )}
          {pageNumber <= numPages && (
            <button
              className="bg-gray-100 py-1 px-1  rounded-md"
              onClick={() => {
                handleNext();
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPDF;
