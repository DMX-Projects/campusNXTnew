import { useState, useMemo } from 'react';

interface UsePaginationProps {
  data: any[];
  itemsPerPage: number;
}

export const usePagination = ({ data, itemsPerPage }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToPrevious = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const goToNext = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  return {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    goToPrevious,
    goToNext,
    itemsPerPage,
    totalItems: data.length
  };
};