import { Button } from '@chakra-ui/react'

interface Props {
  index: number
  value: string
  onClickEvent: (index: number) => void
}
const Square: React.FC<Props> = ({ index, value, onClickEvent }) => {
  return (
    <Button
      color="gray.800"
      borderRadius="0"
      bgColor="gray.200"
      onClick={() => onClickEvent(index)}
      w="40px"
      h="50px"
    >
      {value}
    </Button>
  )
}

export default Square
