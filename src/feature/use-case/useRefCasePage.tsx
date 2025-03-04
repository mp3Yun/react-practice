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
    <Box p={4} className="show-border">
      <Box flex={1}>使用 useRef 儲存狀態</Box>
      <Box flex={1}>點擊次數：{count}</Box>
      <Box flex={1}>當前渲染儲存的值: {rerenderCountRef.current}</Box>
      <Button onClick={handleCountClick}>計數器 + 1</Button>
    </Box>
  )
}

// sample 2
const UseRefCase2: React.FC = () => {
  const [seconds, setSeconds] = useState(0)
  const timeRef = useRef<number | null>(null)

  const startTimer = () => {
    if (!timeRef.current) {
      timeRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1)
      }, 1000)
    }
  }

  const stopTimer = () => {
    clearInterval(timeRef.current ?? 0)
    timeRef.current = null
  }

  return (
    <Box
      p={4}
      style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      className="show-border"
    >
      <Box>
        <h2>使用 useRef 儲存計時器</h2>
      </Box>
      <Box>
        <p>時間：{seconds} 秒</p>
      </Box>
      <Button onClick={startTimer}>開始計時</Button>
      <Button onClick={stopTimer}>停止計時</Button>
    </Box>
  )
}

const UseRefCasePage: React.FC = () => {
  return (
    <Flex dir="column" my={2}>
      <NestedComponent title="useRef 特性">
        <NestedComponent title="範例一">
          <UseRefCase1></UseRefCase1>
        </NestedComponent>

        <NestedComponent title="範例二">
          <UseRefCase2></UseRefCase2>
        </NestedComponent>
      </NestedComponent>
    </Flex>
  )
}

export default UseRefCasePage
