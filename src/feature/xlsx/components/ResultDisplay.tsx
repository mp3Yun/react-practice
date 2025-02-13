import { Box, Text } from '@chakra-ui/react'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { ReportType } from '../../../helper/report-parser-content/report-parser-context'
import { resultComponentMap } from '../parser-result/ParserResult'

interface ResultDisplayProps<T> {
  reportType: ReportType
  parsedData: T[]
  isLoading: boolean
}

const ResultDisplay = <T,>({
  reportType,
  parsedData,
  isLoading,
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
    >
      {parsedData.length > 0 ? (
        <ResultComponent data={parsedData} />
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
