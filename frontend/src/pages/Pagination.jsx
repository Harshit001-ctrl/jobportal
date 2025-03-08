import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
     console.log("Current Page inside pagination:", currentPage);
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`py-2 px-4 rounded font-bold ${
          currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400 text-gray-800"
        }`}
      >
        Prev
      </button>

      <span className="text-lg font-semibold">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`py-2 px-4 rounded font-bold ${
          currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-300 hover:bg-gray-400 text-gray-800"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;