import { Box, Button, Card, Flex } from '@chakra-ui/react'
import { Outlet, useRouter } from '@tanstack/react-router'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { RoutePathEnum } from '../../dto/route-paths'

const HomePage: React.FC = () => {
  const router = useRouter() // TODO: 我的路由，在拉成 service???

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
            {/* TODO: 做側選單的 menu */}
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
              minHeight={'80vh'}
            >
              <Outlet />
            </Card>
          </Box>
        </Flex>

        <Footer />
      </Flex>
    </>
  )
}

export default HomePage
