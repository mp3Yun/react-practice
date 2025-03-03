import React, { useEffect, useState } from 'react'
import { ReportType } from '../../../helper/report-parser-content/report-parser-context'
import useExcelWithStrategy from '../../../hooks/UseExcelWithStrategy'
import { Box, Text } from '@chakra-ui/react'
import usePagination from '../../../hooks/UsePagination'
import { useInView } from 'react-intersection-observer'
import ResultDisplay from '../components/ResultDisplay'
import FileUpload from '../../../components/buttons/FileUpload'

const HotelsPage: React.FC = () => {
  const [showData, setShowData] = useState<any[]>([])
  const [reportType, setReportType] = useState<ReportType>('HotelsReport')
  const { parsedData, handleFile } = useExcelWithStrategy(reportType)

  const {
    currentPage,
    isLoading,
    paginatedData,
    loadMoreData,
    startLoading,
    stopLoading,
    resetCurrentPage,
  } = usePagination(parsedData, 10)

  const { ref, inView, entry } = useInView({
    threshold: 0,
    triggerOnce: false, // 允許多次觸發
  }) // 監聽元素是否進入視圖

  useEffect(() => {
    if (parsedData) {
      startLoading()
      // 模擬延遲
      const timerId = setTimeout(() => {
        setShowData((prev) => [...prev, ...paginatedData()]) // 初始化，顯示10筆資料
        stopLoading()
      }, 1000)

      return () => clearTimeout(timerId)
    }
  }, [parsedData, currentPage])

  // 監聽 scrollbar 的處理
  useEffect(() => {
    if (inView) {
      loadMoreData()
    }
  }, [inView, entry])

  // 處理檔案選擇事件
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] // 獲取選擇的文件
    if (file) {
      // 確定有選取資料，則清空顯示資料
      setShowData([])
      resetCurrentPage()
      handleFile(file)
    }
  }

  return (
    <Box display="flex" flexDir="column" gap="1rem">
      <Box>
        <Text fontSize="2xl">Deal with Hotels</Text>
      </Box>

      <Box
        display="flex"
        flexDir="column"
        gap="1rem"
        className="show-border"
        borderRadius="md"
        padding="1rem"
      >
        <Text fontSize="xl">upload xlsx</Text>
        <FileUpload onFileSelect={handleFileUpload}></FileUpload>
      </Box>
      <Text fontSize="xl">Results Display</Text>
      {/* result */}
      <ResultDisplay
        reportType={reportType}
        parsedData={showData}
        isLoading={isLoading}
      ></ResultDisplay>
      {/* ref 綁定底部元素，用於偵測是否滑到底部了 */}
      {showData.length > 0 && <Box ref={ref} height="2px"></Box>}
    </Box>
  )
}

export default HotelsPage
