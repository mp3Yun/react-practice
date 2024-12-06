import { Flex, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Flex as="footer" justify={'center'} pb={4}>
      <Text fontSize={'sm'} textAlign={'center'}>
        我的Footer
      </Text>
    </Flex>
  )
}

export default Footer
