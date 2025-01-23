import { Grid, GridItem, Text } from '@chakra-ui/react'

interface Props {
  score: number
  remainingSeconds: number
}

const ScoreBoard: React.FC<Props> = ({ score, remainingSeconds }) => {
  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      templateRows="repeat(2, 1fr)"
      gap="1rem"
      alignItems="center"
      justifyItems="center"
    >
      <GridItem>
        <Text fontSize="xl">SCORE</Text>
      </GridItem>
      <GridItem>
        <Text fontSize="xl">Remaining Time</Text>
      </GridItem>
      <GridItem>
        <Text fontSize="xl">{score}</Text>
      </GridItem>
      <GridItem>
        <Text fontSize="xl">{remainingSeconds}</Text>
      </GridItem>
    </Grid>
  )
}

export default ScoreBoard
