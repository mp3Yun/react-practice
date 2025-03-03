import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import AdvertisementModal from '../../components/modals/AdvertisementModal'
import { useAuth } from '../../hooks/AuthContext'
import { useOverlayVisible } from '../../hooks/OverlayVisibleContext'
import SidebarList from './components/sidebarItems/SidebarList'

const HomePage: React.FC = () => {
  // 取得登入結果
  const { isLogin } = useAuth()
  // 廣告popup控制
  const [isModalOpen, setMoalOpen] = useState(false)
  // 取得 isOverlayVisible 狀態
  const { isOverlayVisible } = useOverlayVisible()

  const isPlanTrip = import.meta.env.VITE_IS_PLAN_TRIP === 'true'

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
        {!isPlanTrip && (
          <Header style={{ display: isOverlayVisible ? 'none' : 'flex' }} />
        )}

        <Flex
          direction="row"
          width="100%"
          as="main"
          flex={1}
          justify={'left'}
          pt={isOverlayVisible ? 16 : 4}
          boxSizing="border-box"
          height={`calc(100vh - ${isOverlayVisible ? 16 : 4}rem)`} // 動態計算高度
        >
          {/* sidebar */}
          <Box w={{ base: '20%', md: '20%' }} bg="gray.100">
            <SidebarList />
          </Box>

          {/* main content */}
          <Box
            flex={1}
            p={isOverlayVisible ? 0 : 4}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Box
              padding={isOverlayVisible ? 0 : '1.5rem'}
              className="custom-scrollbar"
              css={{
                '--scrollbar-max-height': isPlanTrip
                  ? 'calc(100vh - 20px)'
                  : 'calc(100vh - 160px)',
              }}
              maxHeight={
                isOverlayVisible
                  ? 'calc(100vh - 4rem)'
                  : 'var(--scrollbar-max-height)'
              }
              bg="white"
              height={isOverlayVisible ? '100vh' : 'auto'} // 占滿視窗高度
            >
              <Outlet />
            </Box>
          </Box>
        </Flex>

        {!isPlanTrip && (
          <Footer style={{ display: isOverlayVisible ? 'none' : 'block' }} />
        )}
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
            overflow: 'hidden', // 改為 hidden 確保內容不溢出
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
