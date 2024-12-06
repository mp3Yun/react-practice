import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import Footer from './components/Footer'
import Header from './components/Header'
import Card from './components/Card'
import FixedButton from './components/buttons/FixedButton'
import ConfirmDialog from './components/dialogs/ConfirmDialog'

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
              <Box>
                <FixedButton onClick={onOpen} />
                <ConfirmDialog
                  isOpen={isOpen}
                  onConfirm={onClose}
                  onClose={onClose}
                  confirmTitle={'新增一筆 note'}
                  confirmMessage={'是否新增一筆 note?'}
                ></ConfirmDialog>
              </Box>
            </Card>
          </Box>
        </Flex>

        <Footer />
      </Flex>
    </>
  )
}

export default App
