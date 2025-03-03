import { Box, Text } from '@chakra-ui/react'
import { Outlet, useRouterState } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { PiWarningFill } from 'react-icons/pi'
import NestedComponent from '../../components/NestedComponent'
import { DragProvider } from '../../hooks/contexts/drag-context/UseDragContext'

const XlsxHomePage: React.FC = () => {
  // 取得當前路徑
  const { location } = useRouterState()
  const [isOpen, setIsOpen] = useState(() => false)

  useEffect(() => {
    console.error('location', location)
    if (location.pathname === '/home/xlsx') {
      console.log('99-沒有反應耶?')
      setIsOpen(true)
    } else {
      console.log('99-應該要被關起來啦??')
      setIsOpen(false)
    }
  }, [location])
  return (
    <>
      <DragProvider>
        <NestedComponent isOpen={isOpen}>
          <Box gap="2rem" color={'gray.600'} fontSize="xl">
            <Text fontSize="2xl" fontWeight="bold">
              使用說明
            </Text>
            <p>
              1. 請依據 excel
              範例下載檔案並填入相關資料，全部輸入完畢後，再上傳檔案，根據上傳項目，選取有興趣的並點選愛心進行註記。
            </p>
            <p> 2. 請依據上述步驟，將所有項目選取後，再進行排序。</p>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              <PiWarningFill />
              <span style={{ fontWeight: 'bold' }}>注意:</span>
              可排序項目為有標記愛心的註記項目，一旦重整，則須重新排列行程。
            </p>
          </Box>
          <Box gap="2rem" display="flex" flexDir="row">
            <Text color="gray.600" fontSize="xl" fontWeight="bold">
              下載檔案:
            </Text>
            <Box
              display="flex"
              alignItems="center"
              flexDir="row"
              color="primary.500"
              gap="2rem"
            >
              <Text fontSize="xl" fontWeight="bold">
                <a href="/files/Spots.xlsx" download="SpotsSample.xlsx">
                  景點
                </a>
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                住宿
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                餐廳
              </Text>
            </Box>
          </Box>
        </NestedComponent>
        <Outlet />
      </DragProvider>
    </>
  )
}

export default XlsxHomePage
