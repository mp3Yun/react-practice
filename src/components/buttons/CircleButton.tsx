import { Button } from '@chakra-ui/react'

interface Props {
  onClick?: () => void
}

const CircleButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button
      alignItems={'center'}
      className="show-border"
      borderRadius={'50%'}
      width={'32px'}
      height={'32px'}
      padding="0"
      variant={'gray'}
      onClick={onClick}
    >
      {/* TODO: 讓 icon 可以是變動的 */}
    </Button>
  )
}

export default CircleButton
