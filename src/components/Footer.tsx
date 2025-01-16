import { Flex, Text } from '@chakra-ui/react'

const Footer = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <Flex as="footer" justify={'center'} pb={4} style={style}>
      <Text fontSize={'sm'} textAlign={'center'}>
        我的Footer
      </Text>
    </Flex>
  )
}

export default Footer
