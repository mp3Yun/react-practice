import { useDisclosure, Flex, Box, Button, Card } from '@chakra-ui/react'
import { Outlet, useRouter } from '@tanstack/react-router'
import FixedButton from '../../components/buttons/FixedButton'
import ConfirmDialog from '../../components/dialogs/ConfirmDialog'
import ExpandableTextCard from '../../components/expandableTextCards/ExpandableTextCard'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import expandableTextDataSet from '../../dataSet/expandableText-data'
import { ChakraIcons, createIcon, SvgIcons } from '../../utils/icons-utils'
import { RoutePathEnum } from '../../dto/route-paths'

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
          <Box w={{ base: '20%', md: '20%' }} bg="gray.100">
            <Button
              onClick={() => {
                router.navigate({
                  to: RoutePathEnum.Home,
                })
              }}
            >
              home
            </Button>
            <Button
              onClick={() => {
                router.navigate({
                  to: RoutePathEnum.Button,
                })
              }}
            >
              button
            </Button>
          </Box>
          {/* main content */}
          <Box flex={1} p={4} alignItems={'center'} justifyContent={'center'}>
            <Card
              padding={'1.5rem'}
              className="custom-scrollbar"
              sx={{
                '--scrollbar-max-height': 'calc(100vh - 160px)',
              }} // 動態設置 CSS 變數
            >
              {/* TODO: 我的路由測試區 */}
              <h1>main content</h1>
              <Outlet />
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
