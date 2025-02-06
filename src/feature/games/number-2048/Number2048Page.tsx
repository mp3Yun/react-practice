import { Box, Button, Grid, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const Number2048Page: React.FC = () => {
  // 初始化 array
  const defaultColumn = 4
  const _2048Array = Array.from(
    { length: defaultColumn * defaultColumn },
    () => ''
  )

  const [spendTime, setSpendTime] = useState(0)
  const [gameStart, setGameStart] = useState(false)

  useEffect(() => {
    let timerId = 0
    if (gameStart) {
      timerId = setInterval(() => {
        setSpendTime((prev) => prev + 1)
      }, 1000)

      // [主遊戲邏輯]
      // 監聽玩家輸入: 上、下、左、右
      // 進行數字合併/移動
      // 生成新的數字方塊
      // 遊戲是否結束? 判斷是否已有數字已達 2048
    }

    return () => clearInterval(timerId)
  }, [gameStart])

  return (
    <Box w="100%" h="auto" alignContent="center" justifyItems="center">
      <Text fontSize="2xl" my="2rem">
        Number 2048 Game
      </Text>
      <Text fontSize="xl">Spend Time: {spendTime}</Text>
      <Box my="1rem">
        <Button onClick={() => setGameStart(!gameStart)}>
          {gameStart ? 'Stop Game' : 'Start Game'}
        </Button>
      </Box>
      <Grid
        templateColumns={`repeat(${defaultColumn}, 1fr)`}
        templateRows={`repeat(${defaultColumn}, 1fr)`}
        gap="0.1rem"
      >
        {_2048Array.map((item, index) => (
          <Box
            key={index}
            display="flex"
            borderRadius="15px"
            width="75px"
            height="75px"
            backgroundColor="gray.300"
            alignItems="center"
            justifyContent="center"
          >
            {item}
          </Box>
        ))}
      </Grid>
    </Box>
  )
}

export default Number2048Page
