import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useOverlayVisible } from '../../hooks/OverlayVisibleContext'
import './ChineseCabbagePage.css'
import About from './components/About'
import Footer from './components/Footer'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Services from './components/Services'
import Tours from './components/Tours'

const ChineseCabbagePage: React.FC = () => {
  const { showOverlay, hideOverlay } = useOverlayVisible()

  // 使用 useEffect 處理 overlay 的開關
  useEffect(() => {
    showOverlay()

    return () => {
      hideOverlay()
    }
  }, [])
  return (
    <>
      <Box
        className="chineseCabbagePage"
        width="100%"
        scrollBehavior="smooth"
        overflowY="scroll"
        minHeight="100vh" // 限制高度以啟用滾動
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          msOverflowStyle: 'none', // IE 10+
          scrollbarWidth: 'none', // Firefox
        }}
      >
        <Navbar></Navbar>
        <Home></Home>
        <About></About>
        <Services></Services>
        <Tours></Tours>
        <Footer></Footer>
      </Box>
    </>
  )
}

export default ChineseCabbagePage
