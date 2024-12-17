import { Box, Button, Flex } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import NestedComponent from '../../components/NestedComponent'

// sample 1
const UseRefCase1: React.FC = () => {
  const [count, setCount] = useState(0)
  const rerenderCountRef = useRef(0)
  // 查看這整個組件渲染的次數
  rerenderCountRef.current = rerenderCountRef.current + 1
  const handleCountClick = () => {
    setCount(count + 1)
  }
  return (
    <Box>
      <Box flex={1}>使用 useRef 儲存狀態</Box>
      <Box flex={1}>點擊次數：{count}</Box>
      <Box flex={1}>當前渲染儲存的值: {rerenderCountRef.current}</Box>
      <Button onClick={handleCountClick}>計數器 + 1</Button>
    </Box>
  )
}

const UseRefCasePage: React.FC = () => {
  return (
    <Flex dir="clou" my={8}>
      useRef 特性
      <NestedComponent title="範例一">
        <UseRefCase1></UseRefCase1>
      </NestedComponent>
    </Flex>
  )
}

export default UseRefCasePage
