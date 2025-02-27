import { Box, BoxProps, Text } from '@chakra-ui/react'
import React from 'react'

interface Props extends BoxProps {
  size: 's' | 'm' | 'l' | 'xl'
  text: string
  boxProps?: BoxProps
}
const CircleWithText: React.FC<Props> = ({ size, text, boxProps }) => {
  const sizes = {
    s: '30px',
    m: '50px',
    l: '70px',
    xl: '100px',
  }
  return (
    <Box
      className="circle-marker"
      w={sizes[size] || sizes.m}
      h={sizes[size] || sizes.m}
      bg="blue.500"
      color="white"
      borderRadius="50%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontWeight="bold"
      {...boxProps}
    >
      <Text
        fontSize="sm"
        lineHeight="2"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        maxW="80%"
        position="relative"
        // top="-7px" // 手動往上移動
      >
        {text}
      </Text>
    </Box>
  )
}

export default CircleWithText
