import { Button, ButtonProps, Text } from '@chakra-ui/react'
import React from 'react'

interface Props extends ButtonProps {
  text: string
  fontSize?: string
}
const SquareButton: React.FC<Props> = ({ text, fontSize, ...props }) => {
  return (
    <Button borderRadius={'md'} {...props}>
      <Text fontSize={fontSize ?? 'lg'}>{text}</Text>
    </Button>
  )
}

export default SquareButton
