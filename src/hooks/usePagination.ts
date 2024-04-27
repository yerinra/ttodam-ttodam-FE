import React, { useState } from 'react';

export default function usePagination(total: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const itemsPerPage = 2;
  const pagesToShow = 5;
  const totalPages = Math.ceil(total / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handleNextPageGroup = () => {
    if (startPage + pagesToShow <= totalPages) {
      setStartPage(startPage + pagesToShow);
    }
  };
  const handlePrevPageGroup = () => {
    if (startPage - pagesToShow >= 1) {
      setStartPage(startPage - pagesToShow);
    }
  };
  const handlePageClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const { innerText } = e.target as HTMLLIElement;
    const newPage = Number(innerText);
    setCurrentPage(newPage);
  };
  return {
    startPage,
    setStartPage,
    currentPage,
    setCurrentPage,
    indexOfFirstItem,
    indexOfLastItem,
    handleNextPageGroup,
    handlePrevPageGroup,
    handlePageClick,
    totalPages,
    pagesToShow,
  };
}
