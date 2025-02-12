import { useState } from 'react'

interface UsePaginationProp {
  currentPage: number
  hasMore: boolean
  loadMoreData: () => void
  paginatedData: () => any[]
}
const usePagination = (data: any, pageSize: number): UsePaginationProp => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const paginatedData = () => {
    // 取得下一批資料的起始索引值
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return data.slice(startIndex, endIndex)
  }

  const loadMoreData = () => {
    if ((currentPage + 1) * pageSize > data.length) {
      // 沒有更多資料了
      setHasMore(false)
    } else {
      // 當前頁數 + 1
      setCurrentPage(currentPage + 1)
    }
  }

  return { currentPage, hasMore, paginatedData, loadMoreData }
}

export default usePagination
