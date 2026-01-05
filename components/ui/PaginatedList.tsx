"use client";
import React, { useState, useMemo } from "react";
import { Pagination, Box, Flex, Text, Select } from "@mantine/core";

interface PaginatedListProps<T> {
  items: T[];
  itemsPerPage?: number;
  showPaginationThreshold?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  renderWrapper?: (children: React.ReactNode) => React.ReactNode;
  showItemCount?: boolean;
  showPageSizeSelector?: boolean;
  pageSizeOptions?: number[];
  className?: string;
}

export function PaginatedList<T>({
  items,
  itemsPerPage = 15,
  showPaginationThreshold,
  renderItem,
  renderWrapper,
  showItemCount = true,
  showPageSizeSelector = false,
  pageSizeOptions = [10, 15, 25, 50],
  className = "",
}: PaginatedListProps<T>) {
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(itemsPerPage);

  // Calculate threshold - if not provided, use itemsPerPage
  const threshold = showPaginationThreshold ?? pageSize;

  // Calculate total pages
  const totalPages = Math.ceil(items.length / pageSize);

  // Get current page items
  const paginatedItems = useMemo(() => {
    const startIndex = (activePage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex);
  }, [items, activePage, pageSize]);

  // Reset to first page when page size changes
  const handlePageSizeChange = (value: string | null) => {
    if (value) {
      setPageSize(Number(value));
      setActivePage(1);
    }
  };

  // Reset to first page if items change and current page is out of bounds
  React.useEffect(() => {
    if (activePage > totalPages && totalPages > 0) {
      setActivePage(1);
    }
  }, [items.length, totalPages, activePage]);

  const shouldShowPagination = items.length > threshold;

  const renderedItems = paginatedItems.map((item, index) => {
    const globalIndex = (activePage - 1) * pageSize + index;
    return renderItem(item, globalIndex);
  });

  const content = renderWrapper ? renderWrapper(renderedItems) : renderedItems;

  return (
    <Box className={className}>
      {content}

      {shouldShowPagination && (
        <Flex
          justify="space-between"
          align="center"
          wrap="wrap"
          gap="md"
          className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
        >
          {showItemCount && (
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Showing {(activePage - 1) * pageSize + 1}-
              {Math.min(activePage * pageSize, items.length)} of {items.length}{" "}
              items
            </Text>
          )}

          <Flex align="center" gap="md">
            {showPageSizeSelector && (
              <Flex align="center" gap="xs">
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                  Per page:
                </Text>
                <Select
                  size="xs"
                  value={String(pageSize)}
                  onChange={handlePageSizeChange}
                  data={pageSizeOptions.map((size) => ({
                    value: String(size),
                    label: String(size),
                  }))}
                  className="w-20"
                  comboboxProps={{ withinPortal: true }}
                />
              </Flex>
            )}

            <Pagination
              total={totalPages}
              value={activePage}
              onChange={setActivePage}
              size="sm"
              radius="md"
              withEdges
              classNames={{
                control:
                  "border-gray-300 dark:border-gray-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 data-[active=true]:bg-emerald-600 data-[active=true]:border-emerald-600",
              }}
            />
          </Flex>
        </Flex>
      )}
    </Box>
  );
}

// Simpler hook-based approach for more control
export function usePagination<T>(items: T[], itemsPerPage: number = 15) {
  const [activePage, setActivePage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const startIndex = (activePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, activePage, itemsPerPage]);

  // Reset to first page if items change and current page is out of bounds
  React.useEffect(() => {
    if (activePage > totalPages && totalPages > 0) {
      setActivePage(1);
    }
  }, [items.length, totalPages, activePage]);

  return {
    paginatedItems,
    activePage,
    setActivePage,
    totalPages,
    totalItems: items.length,
    startIndex: (activePage - 1) * itemsPerPage + 1,
    endIndex: Math.min(activePage * itemsPerPage, items.length),
    shouldShowPagination: items.length > itemsPerPage,
  };
}
