import { useState } from 'react'

interface UsePaginationProp {
  currentPage: number
  hasMore: boolean
  isLoading: boolean
  loadMoreData: () => void
  paginatedData: () => any[]
  startLoading: () => void
  stopLoading: () => void
  resetCurrentPage: () => void
}
const usePagination = (
  reportData: any[],
  pageSize: number
): UsePaginationProp => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)
  const resetCurrentPage = () => setCurrentPage(1)

  const paginatedData = () => {
    // 取得下一批資料的起始索引值
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return reportData.slice(startIndex, endIndex)
  }

  const loadMoreData = () => {
    if ((currentPage + 1) * pageSize > reportData.length) {
      // 沒有更多資料了
      setHasMore(false)
    } else {
      // 當前頁數 + 1
      setCurrentPage(currentPage + 1)
    }
  }

  return {
    currentPage,
    hasMore,
    isLoading,
    paginatedData,
    loadMoreData,
    startLoading,
    stopLoading,
    resetCurrentPage,
  }
}

export default usePagination
