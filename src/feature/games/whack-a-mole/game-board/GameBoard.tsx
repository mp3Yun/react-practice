import { Box, Grid } from '@chakra-ui/react'
import { useState } from 'react'

interface Props {
  level: number
}
const GameBoard: React.FC<Props> = ({ level }) => {
  // 狀態管理
  const [molePositions, setMolePositions] = useState<number[]>([])
  return (
    <Grid
      templateColumns={`repeat(${level + 1}, 1fr)`}
      templateRows={`repeat(${level + 1}, 1fr)`}
      gap="0.5rem"
    >
      {Array.from({ length: (level + 1) * (level + 1) }, (_, i) => (
        <Box
          key={i}
          bg="brown" // 地洞背景色
          borderRadius="50%" // 圓形
          w="80px" // 寬度
          h="80px" // 高度
          position="relative"
          overflow="hidden"
          display="flex"
          justifyContent="center"
          alignItems="center"
          boxShadow="inset 0 -8px 10px rgba(0, 0, 0, 0.5)" // 洞內陰影效果
        >
          {i}
        </Box>
      ))}
    </Grid>
  )
}

export default GameBoard
