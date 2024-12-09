import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import Card from './components/Card'
import Footer from './components/Footer'
import Header from './components/Header'
import FixedButton from './components/buttons/FixedButton'
import ConfirmDialog from './components/dialogs/ConfirmDialog'
import ExpandableTextCard from './components/expandableTextCards/ExpandableTextCard'
import expandableTextDataSet from './dataSet/expandableText-data'

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // 我的模擬資料
  const expandableTextData = [...expandableTextDataSet]
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
            <Card
              className="custom-scrollbar"
              sx={{
                '--scrollbar-max-height': 'calc(100vh - 160px)',
              }} // 動態設置 CSS 變數
            >
              {/* router TODO: */}
              <h1>main content</h1>

              {/* 展開卡片測試 */}
              {expandableTextData.map((text, index) => (
                <ExpandableTextCard
                  key={index}
                  mt={'1rem'}
                  text={text}
                ></ExpandableTextCard>
              ))}
            </Card>
          </Box>
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
        </Flex>

        <Footer />
      </Flex>
    </>
  )
}

export default App
