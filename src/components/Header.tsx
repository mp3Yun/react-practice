import { Flex } from '@chakra-ui/react'

const Header = ({ style }: { style?: React.CSSProperties }) => {
  return (
    <Flex as="header" justify={'space-between'} px={4} pt={4} style={style}>
      <h1>Hi, Irene</h1>
      <h2>welcome</h2>
    </Flex>
  )
}

export default Header
