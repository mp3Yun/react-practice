import { Box, Flex, Portal } from '@chakra-ui/react'
import { Outlet } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import AdvertisementModal from '../../components/modals/AdvertisementModal'
import { useAuth } from '../../hooks/AuthContext'
import SidebarList from './components/sidebarItems/SidebarList'

const HomePage: React.FC = () => {
  // 取得登入結果
  const { isLogin } = useAuth()
  // 廣告popup控制
  const [isModalOpen, setMoalOpen] = useState(false)

  // 使用 useEffect 處理 modal 的開關，避免無限渲染
  useEffect(() => {
    if (isLogin) {
      setMoalOpen(true)
    }
  }, [isLogin]) // 依賴 isLogin 變化

  return (
    <>
      <Flex
        direction={'column'}
        minHeight={'100vh'}
        backgroundColor={'gray.100'}
      >
        <Header />

        <Flex as="main" flex={1} py={4} justify={'left'}>
          {/* sidebar */}
          <Box w={{ base: '20%', md: '20%' }} bg="gray.100">
            <SidebarList />
          </Box>

          {/* main content */}
          <Box flex={1} p={4} alignItems={'center'} justifyContent={'center'}>
            <Box
              padding={'1.5rem'}
              className="custom-scrollbar"
              css={{ '--scrollbar-max-height': 'calc(100vh - 160px)' }}
              maxHeight="var(--scrollbar-max-height)"
              bg="white"
            >
              <Outlet />
            </Box>
          </Box>
        </Flex>

        <Footer />
      </Flex>
      {/* 顯示廣告 Modal  [方法一] */}
      {isModalOpen && (
        <Box
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            overflow: 'visible',
          }}
        >
          <AdvertisementModal
            isOpen={isModalOpen}
            onClose={() => setMoalOpen(false)}
          />
        </Box>
      )}
    </>
  )
}

export default HomePage
