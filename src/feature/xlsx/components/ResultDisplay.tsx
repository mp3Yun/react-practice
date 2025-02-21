import { Box, Text } from '@chakra-ui/react'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { ReportType } from '../../../helper/report-parser-content/report-parser-context'
import { resultComponentMap } from '../parser-result/ParserResult'

export interface DisplayItem {
  justForShow?: boolean
}
interface ResultDisplayProps<T> extends DisplayItem {
  reportType: ReportType
  parsedData: T[]
  isLoading: boolean
}

const ResultDisplay = <T,>({
  reportType,
  parsedData,
  isLoading,
  justForShow,
}: ResultDisplayProps<T>) => {
  const ResultComponent =
    resultComponentMap[reportType] || (() => <Text>No valid strategy</Text>)
  return (
    <Box
      display="flex"
      flexDir="column"
      gap="1rem"
      className="show-border"
      padding="1rem"
      width="100%" // 第二層寬度佔滿外層
      height="100%" // 第二層高度佔滿外層
      maxWidth="100%" // 不超過上一層的寬度
      maxHeight="100%" // 不超過上一層的高度
      overflow="auto" // 讓內容溢出時出現滾動條
    >
      {parsedData.length > 0 ? (
        <ResultComponent data={parsedData} justForShow={justForShow} />
      ) : isLoading ? null : (
        'no data'
      )}
      {isLoading && (
        <Box alignSelf="center">
          <LoadingSpinner></LoadingSpinner>
        </Box>
      )}
    </Box>
  )
}

export default ResultDisplay
