import { AddIcon } from '@chakra-ui/icons/Add'
import { Box, Button } from '@chakra-ui/react'

interface Props {
  onClick?: () => void
}
const FixedButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Box position={'fixed'} bottom={'20px'} right={'20px'}>
      <Button
        variant={'primary'}
        borderRadius={'50%'}
        width={'60px'}
        height={'60px'}
        padding={'0'}
        boxShadow={'0px 4px 6px rgba(0, 0, 0, 0.3)'}
        onClick={onClick}
      >
        <AddIcon boxSize={6} />
      </Button>
    </Box>
  )
}

export default FixedButton
