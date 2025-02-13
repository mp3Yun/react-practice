import { Box, Text } from '@chakra-ui/react'
import { Strategy } from '../strategy/ParserFactory'
import { resultComponentMap } from '../parser-result/ParserResult'
import LoadingSpinner from '../../../components/LoadingSpinner'

interface ResultDisplayProps<T> {
  strategy: Strategy
  parsedData: T[]
  isLoading: boolean
}

const ResultDisplay = <T,>({
  strategy,
  parsedData,
  isLoading,
}: ResultDisplayProps<T>) => {
  const ResultComponent =
    resultComponentMap[strategy] || (() => <Text>No valid strategy</Text>)
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
