import React from 'react';
import './paginationButtons.css';

function PaginationButtons({ currentPage, totalPages, handlePrevPage, handleNextPage }) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div>
      <button
        className="prev"
        onClick={handlePrevPage}
        disabled={isFirstPage}
      >
        &#x2190; Prev
      </button>
      <button
        className="next"
        onClick={handleNextPage}
        disabled={isLastPage}
      >
        Next &#x2192;
      </button>
    </div>
  );
}

export default PaginationButtons;
