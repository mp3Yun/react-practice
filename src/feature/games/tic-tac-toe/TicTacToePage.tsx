import { Box, Button, Grid, GridItem, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import Square from '../../../components/square/Square'

interface StepRecord {
  player: string
  position: [number, number]
}
const TicTacToePage: React.FC = () => {
  const initBoard: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]
  // 當前 user 是否為 X?
  const [xIsNext, setXIsNext] = useState(true)
  // 畫布的顯示紀錄
  const [board, setBoard] = useState(initBoard)
  // 步驟紀錄
  const [steps, setSteps] = useState<Record<string, StepRecord>>({})

  const handleSquareBtn = (clickedIndex: number) => {
    // 更新畫布內容
    const clickedItem = board.flat().map((item, index) => {
      if (index === clickedIndex) {
        return (item = xIsNext ? 'X' : 'O')
      }
      return item
    })

    const tmpBoard = Array.from({ length: 3 }, (_, i) =>
      clickedItem.slice(i * 3, (i + 1) * 3)
    )
    setBoard(tmpBoard)
    // 更新步驟紀錄
    const stepsLength = Object.keys(steps).length
    const tmpStepRecord: StepRecord = {
      player: xIsNext ? 'X' : 'O',
      position: [Math.floor(clickedIndex / 3), clickedIndex % 3],
    }
    setSteps((prev) => ({ ...prev, [stepsLength]: tmpStepRecord }))
    // 變更 xIsNext
    setXIsNext(!xIsNext)
  }

  const handleUndo = () => {
    const stepsLength = Object.keys(steps).length
    if (stepsLength === 0) return
    const tmpBoard = Array.from({ length: 3 }, (_, i) =>
      board.flat().slice(i * 3, (i + 1) * 3)
    )
    tmpBoard[steps[stepsLength - 1].position[0]][
      steps[stepsLength - 1].position[1]
    ] = ''
    setBoard(tmpBoard)
    delete steps[stepsLength - 1]
    setXIsNext(!xIsNext)
  }

  return (
    <Box w="100%" h="auto" alignContent="center" justifyItems="center">
      <Box margin="1rem">
        <Text fontSize="2xl"> Tic Tac Toe</Text>
      </Box>
      <Grid templateRows="repeat(2, 1fr)">
        <GridItem>
          <Text fontSize="xl"> Current player: {xIsNext ? 'X' : 'O'}</Text>
        </GridItem>
        <GridItem>
          <Text fontSize="xl"> Next player: {!xIsNext ? 'X' : 'O'} </Text>
        </GridItem>
      </Grid>
      <Box margin="4rem" className="show-border">
        <Grid templateColumns="repeat(3, 1fr)" gap="2px">
          {board.flat().map((item, index) => {
            return (
              <GridItem key={index}>
                <Square
                  index={index}
                  value={item}
                  onClickEvent={handleSquareBtn}
                ></Square>
              </GridItem>
            )
          })}
        </Grid>
      </Box>
      <Box m="2rem">
        <Button onClick={handleUndo}>Undo</Button>
      </Box>
    </Box>
  )
}

export default TicTacToePage
