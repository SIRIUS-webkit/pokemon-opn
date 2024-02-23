import React, { FC, Dispatch, SetStateAction } from "react";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  itemsPerPage: number;
  lists: [];
  currentPage: number;
}

const Pagination: FC<PaginationProps> = ({
  setCurrentPage,
  itemsPerPage,
  lists,
  currentPage,
}) => {
  function handlePageClick({ selected }: { selected: number }) {
    setCurrentPage(selected);
  }

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      forcePage={currentPage}
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={Math.ceil(lists.length / itemsPerPage)}
      previousLabel="<"
      renderOnZeroPageCount={null}
      className="flex flex-wrap w-full md:space-x-4 md:gap-0 gap-3 justify-center items-center cursor-pointer"
      pageClassName="bg-secondary px-4 py-1 text-white rounded-sm"
      activeClassName="!bg-negative text-white"
      nextClassName="p2 font-bold text-white"
      previousClassName="p2 font-bold text-white"
      breakClassName="text-white"
    />
  );
};

export default Pagination;
