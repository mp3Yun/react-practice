import { Box, Grid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

interface Props {
  level: number
  isGameStarted: boolean
  calculateScore: (score: number) => void
}
const GameBoard: React.FC<Props> = ({
  level,
  isGameStarted,
  calculateScore,
}) => {
  const holeCount = [2, 3, 4, 5, 6]
  // 狀態管理
  const [molePositions, setMolePositions] = useState<boolean[]>([])

  // 刷新地鼠的位置
  useEffect(() => {
    const newPositions = Array.from(
      { length: holeCount[level - 1] * holeCount[level - 1] },
      () => false
    )
    setMolePositions(newPositions)
  }, [level])

  // 控制地鼠出現的時機
  useEffect(() => {
    let moleTimerId = 0
    if (isGameStarted) {
      moleTimerId = setInterval(() => {
        // 30% 機率出現地鼠
        const newPositions = molePositions.map(() => Math.random() < 0.3)
        setMolePositions(newPositions)
      }, 800) // 每 800 毫秒更新一次地鼠位置
    }
    return () => clearInterval(moleTimerId)
  }, [isGameStarted])

  const onMoleClick = (index: number) => {
    if (molePositions[index] && isGameStarted) {
      // 如果地鼠被點擊,增加分數
      const newPositions = [...molePositions]
      newPositions[index] = false
      setMolePositions(newPositions)
      calculateScore(10)
    }
  }

  return (
    <Grid
      templateColumns={`repeat(${holeCount[level - 1]}, 1fr)`}
      templateRows={`repeat(${holeCount[level - 1]}, 1fr)`}
      gap="0.5rem"
    >
      {molePositions.map((isMole, index) => (
        <Box
          key={index}
          w="100px"
          h="100px"
          bg={isMole ? 'yellow.400' : 'gray.300'}
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => onMoleClick(index)}
          cursor={isMole ? 'pointer' : 'default'}
        >
          {isMole && '🐭'}
        </Box>
      ))}
    </Grid>
  )
}

export default GameBoard
