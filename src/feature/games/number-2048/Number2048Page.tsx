import { Box, Button, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ConfirmDialog from '../../../components/dialogs/ConfirmDialog'
import Board from './Board/Board'

const Number2048Page: React.FC = () => {
  const [spendTime, setSpendTime] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    let timerId = 0
    if (gameStarted) {
      timerId = setInterval(() => {
        setSpendTime((prev) => prev + 1)
      }, 1000)
    }

    return () => clearInterval(timerId)
  }, [gameStarted])

  useEffect(() => {
    if (isGameOver) {
      setIsOpen(true)
      setGameStarted(false)
    }
  }, [isGameOver])

  const restartGame = () => {
    setIsGameOver(!isGameOver)
    setGameStarted(true)
    setSpendTime(0)
  }

  return (
    <Box w="100%" h="auto" alignContent="center" justifyItems="center">
      <Text fontSize="2xl" my="2rem">
        Number 2048 Game
      </Text>
      <Text fontSize="xl">Spend Time: {spendTime}</Text>
      <Box my="1rem">
        {gameStarted ? (
          <Button onClick={() => setGameStarted(!gameStarted)}>
            Stop Game
          </Button>
        ) : isGameOver ? (
          <Button
            onClick={() => {
              restartGame()
            }}
          >
            Restart Game
          </Button>
        ) : (
          <Button onClick={() => setGameStarted(!gameStarted)}>
            Start Game
          </Button>
        )}
      </Box>
      <Board gameStarted={gameStarted} setIsGameOver={setIsGameOver}></Board>
      <ConfirmDialog
        isOpen={!!isOpen}
        onConfirm={() => {
          setIsOpen(false)
          restartGame()
        }}
        onClose={() => {
          setIsOpen(false)
        }}
        confirmTitle={'遊戲結束'}
        confirmMessage={'請問是否要重新開始?'}
      ></ConfirmDialog>
    </Box>
  )
}

export default Number2048Page
