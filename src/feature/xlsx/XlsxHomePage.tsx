import { Box, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import FileUpload from '../../components/buttons/FileUpload'
import UseExcel from '../../hooks/UseExcel'
import ResultDisplay from './components/ResultDisplay'
import { Strategy, getParser } from './strategy/ParserFactory'
import usePagination from '../../hooks/UsePagination'

const XlsxHomePage: React.FC = () => {
  const { data, error, handleFile } = UseExcel()
  const [parsedData, setParsedData] = useState<any[]>([]) // 存放處理後的資料
  const [showData, setShowData] = useState<any[]>([])
  const [strategy, setStrategy] = useState<Strategy>('tours')
  const {
    currentPage,
    isLoading,
    paginatedData,
    loadMoreData,
    startLoading,
    stopLoading,
  } = usePagination(parsedData, 10)
  const { ref, inView, entry } = useInView({
    /* Optional options */
    // threshold: 0.3, // 30% 可見時觸發
    threshold: 0,
    triggerOnce: false, // 允許多次觸發
  }) // 監聽元素是否進入視圖

  // 當 data 或 category 更新時，處理數據
  useEffect(() => {
    if (data.length > 0) {
      const parser = getParser(strategy) // 取得對應的資料處理函式
      setParsedData(parser(data)) // 執行處理並更新 state
    }
  }, [data, strategy]) // 監聽 data 和 category 變化

  useEffect(() => {
    if (parsedData.length > 0) {
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
      handleFile(file)
    }
  }

  return (
    <Box display="flex" flexDir="column" gap="1rem">
      <Text fontSize="2xl">Deal with xlsx</Text>
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
        {/* TODO: 新增 parser 的種類 */}
      </Box>
      <Text fontSize="xl">Results Display</Text>
      {/* result */}
      <ResultDisplay
        strategy={strategy}
        parsedData={showData}
        isLoading={isLoading}
      ></ResultDisplay>
      {/* ref 綁定底部元素，用於偵測是否滑到底部了 */}
      {showData.length > 0 && <Box ref={ref} height="2px"></Box>}
    </Box>
  )
}

export default XlsxHomePage
