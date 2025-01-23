import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import { useState } from 'react'
import ScoreBoard from './score-board/ScoreBoard'
import GameBoard from './game-board/GameBoard'

enum LevelType {
  Easy = 1,
  Normal = 2,
  Hard = 3,
  Expert = 4,
  Nightmare = 5,
}
// Function to get the string from the enum value
function getLevelString(level: number): string | undefined {
  return LevelType[level]
}

const WhackAMolePage: React.FC = () => {
  // 狀態管理
  const [score, setScore] = useState(0)
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const [level, setLevel] = useState(LevelType.Easy)

  return (
    <Box w="100%" h="auto" alignContent="center" justifyItems="center">
      <Box margin="1rem">
        <Text fontSize="2xl">Whack A Mole</Text>
      </Box>
      <Box margin="0.5rem">
        <Text fontSize="xl">Level: {getLevelString(level)}</Text>
      </Box>
      <ScoreBoard
        score={score}
        remainingSeconds={remainingSeconds}
      ></ScoreBoard>
      <Box margin="0.5rem">
        <GameBoard level={level}></GameBoard>
      </Box>
    </Box>
  )
}

export default WhackAMolePage
