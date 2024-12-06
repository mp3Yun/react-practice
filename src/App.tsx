import { Box, Flex } from '@chakra-ui/react'
import Footer from './components/Footer'
import Header from './components/Header'
import './styles/style.css'
import Card from './components/Card'

function App() {
  return (
    <>
      <Flex
        direction={'column'}
        minHeight={'100vh'}
        backgroundColor={'gray.100'}
      >
        <Header />

        {/* main */}
        <Flex as="main" flex={1} py={4} justify={'left'}>
          {/* sidebar */}
          <Box w={{ base: '25%', md: '25%' }} bg="gray.100"></Box>
          {/* main content */}
          <Box flex={1} p={4} alignItems={'center'} justifyContent={'center'}>
            <Card>
              {/* router TODO: */}
              <h1>main content</h1>
            </Card>
          </Box>
        </Flex>

        <Footer />
      </Flex>
    </>
  )
}

export default App
