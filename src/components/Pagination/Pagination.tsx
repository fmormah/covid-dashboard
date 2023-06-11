// Import necessary React and Redux hooks and actions
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/actions/patientActions";
import { RootState, DispatchType } from "../../types/index";

// Define the Pagination component
const Pagination: React.FC = () => {
  // Get the dispatch function from Redux
  const dispatch = useDispatch<DispatchType>();

  // Extract necessary pieces of state from the Redux store
  const { pagination, currentPage, data } = useSelector(
    (state: RootState) => state.patients
  );

  // Calculate the total number of pages
  const listPages = data ? Math.ceil(data.length / pagination) : 0;

  // Define a function to handle changing the page
  const handlePageChange = (newPage: number) => {
    // Prevent going out of range
    if (newPage < 1 || newPage > listPages) return;

    // Dispatch an action to change the current page
    dispatch(setCurrentPage(newPage));
  };

  // Render the Pagination component
  return (
    <nav className="pagination-navigation">
      {/* Previous page button. On click, decrease the current page by 1. */}
      <button
        className="nav-arrow previous-button"
        onClick={() => handlePageChange(currentPage - 1)}
      />

      {/* For each page number, create a button that changes the page to that number. */}
      {Array.from({ length: listPages }, (_, i) => i + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          // If this is the current page, add the 'is-active' class
          className={`${
            pageNumber === currentPage ? "is-active" : ""
          } dot-button`}
        />
      ))}

      {/* Next page button. On click, increase the current page by 1. */}
      <button
        className="nav-arrow next-button"
        onClick={() => handlePageChange(currentPage + 1)}
      />
    </nav>
  );
};

// Export the Pagination component
export default Pagination;
