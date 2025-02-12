import { Box, Text } from '@chakra-ui/react'
import { Strategy } from '../strategy/ParserFactory'
import { resultComponentMap } from '../parser-result/ParserResult'

interface ResultDisplayProps<T> {
  strategy: Strategy
  parsedData: T[]
}

const ResultDisplay = <T,>({ strategy, parsedData }: ResultDisplayProps<T>) => {
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
      ) : (
        'no data'
      )}
    </Box>
  )
}

export default ResultDisplay
