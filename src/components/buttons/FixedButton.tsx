import { GrAdd } from 'react-icons/gr'
import { Box, Button } from '@chakra-ui/react'

interface Props {
  onClick?: () => void
}
const FixedButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Box position={'fixed'} bottom={'20px'} right={'20px'}>
      <Button
        color={'primary'}
        borderRadius={'50%'}
        width={'60px'}
        height={'60px'}
        padding={'0'}
        boxShadow={'0px 4px 6px rgba(0, 0, 0, 0.3)'}
        onClick={onClick}
      >
        <GrAdd />
      </Button>
    </Box>
  )
}

export default FixedButton
