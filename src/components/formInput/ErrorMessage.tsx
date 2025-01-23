import { Box, Text } from '@chakra-ui/react'

const ErrorMessage = ({ message }: { message?: string }) => {
  return (
    <Box
      color="red"
      mt={1}
      visibility={message ? 'visible' : 'hidden'} // 隱藏但保留空間
      minHeight="20px" // 固定區塊高度，避免跳動
      lineHeight="20px" // 保持文字居中對齊
    >
      <Text fontSize="sm">{message}</Text>
    </Box>
  )
}

export default ErrorMessage
