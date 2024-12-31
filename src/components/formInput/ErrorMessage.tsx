import { Box, Text } from '@chakra-ui/react'

const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null
  return (
    <Box color="red" mt={1}>
      <Text fontSize="sm">{message}</Text>
    </Box>
  )
}

export default ErrorMessage
