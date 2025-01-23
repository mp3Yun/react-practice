import { Grid } from '@chakra-ui/react'
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
    ></Grid>
  )
}

export default GameBoard
