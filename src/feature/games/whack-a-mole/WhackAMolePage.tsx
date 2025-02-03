import { Box, Button, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ConfirmDialog from '../../../components/dialogs/ConfirmDialog'
import GameBoard from './game-board/GameBoard'
import ScoreBoard from './score-board/ScoreBoard'

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
  const [remainingSeconds, setRemainingSeconds] = useState(30)
  const [level, setLevel] = useState(LevelType.Easy)
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)

  // 遊戲開始
  useEffect(() => {
    let timerId = 0
    if (isGameStarted && remainingSeconds > 0) {
      timerId = setInterval(() => {
        setRemainingSeconds((prev) => prev - 1)
      }, 1000)
    } else if (remainingSeconds === 0) {
      setIsGameStarted(false)

      if (score > 50) {
        setModalOpen(true)
        // 清空分數
        setScore(0)
        // 重置時間
        setRemainingSeconds(30)
        clearInterval(timerId) // 這一個有必要嗎?
      }
    }
    return () => clearInterval(timerId)
  }, [isGameStarted, remainingSeconds])

  const calculateScore = (score: number) => {
    setScore((prev) => prev + score)
  }

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
        <Button onClick={() => setIsGameStarted(!isGameStarted)}>
          {isGameStarted ? 'Stop' : 'Start'}
        </Button>
      </Box>
      <Box margin="0.5rem">
        <GameBoard
          level={level}
          isGameStarted={isGameStarted}
          calculateScore={calculateScore}
        ></GameBoard>
      </Box>

      {/* dialog */}
      <ConfirmDialog
        isOpen={isModalOpen}
        confirmTitle="恭喜通關"
        confirmMessage="是否要挑戰下一個難度?"
        onConfirm={() => {
          setModalOpen(false)
          setLevel(level + 1)
        }}
        onClose={() => setModalOpen(false)}
      ></ConfirmDialog>
    </Box>
  )
}

export default WhackAMolePage
