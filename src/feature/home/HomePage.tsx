import { useDisclosure, Flex, Box, Button, Card } from '@chakra-ui/react'
import { Outlet, useRouter } from '@tanstack/react-router'
import FixedButton from '../../components/buttons/FixedButton'
import ConfirmDialog from '../../components/dialogs/ConfirmDialog'
import ExpandableTextCard from '../../components/expandableTextCards/ExpandableTextCard'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import expandableTextDataSet from '../../dataSet/expandableText-data'
import { ChakraIcons, createIcon, SvgIcons } from '../../utils/icons-utils'

const HomePage: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const router = useRouter() // TODO: 我的路由，在拉成 service???

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
          <Box w={{ base: '25%', md: '25%' }} bg="gray.100">
            {/* TODO: 路由測試 */}
            <Button
              onClick={() => {
                router.navigate({
                  to: '/home',
                })
              }}
            >
              home
            </Button>
            <Button
              onClick={() => {
                router.navigate({
                  to: '/home/button',
                })
              }}
            >
              button
            </Button>
          </Box>
          {/* main content */}
          <Box flex={1} p={4} alignItems={'center'} justifyContent={'center'}>
            <Card
              className="custom-scrollbar"
              sx={{
                '--scrollbar-max-height': 'calc(100vh - 160px)',
              }} // 動態設置 CSS 變數
            >
              <h1>main content</h1>
              <Outlet />

              {/* icon 測試區 */}
              <Box>
                <div>
                  {/* 動態創建 AddIcon */}
                  {createIcon(ChakraIcons.Add, {
                    boxSize: 6,
                    color: 'blue.500',
                  })}

                  {/* 動態創建 DeleteIcon */}
                  {createIcon(ChakraIcons.Delete, {
                    boxSize: 8,
                    color: 'red.500',
                  })}

                  {/* 動態創建 EditIcon */}
                  {createIcon(ChakraIcons.Edit, {
                    boxSize: 10,
                    color: 'green.500',
                  })}

                  {/* 動態創建 InfoIcon */}
                  {createIcon(ChakraIcons.Info, {
                    boxSize: 10,
                    color: 'primary.500',
                  })}
                  {/* 自定義 SVG Icon */}
                  {createIcon(SvgIcons.React, {
                    imgProps: { width: 50, height: 50, alt: 'Custom Icon 1' },
                  })}
                </div>
              </Box>

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

export default HomePage
