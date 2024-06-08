const Pagination = ({ currentPage, handlePrevPage, handleNextPage, itemsPerPage, issues }) => {
    return (
        <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= issues.length}
          className="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };
  export default Pagination