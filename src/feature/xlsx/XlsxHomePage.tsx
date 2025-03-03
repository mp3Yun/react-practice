import { Outlet } from '@tanstack/react-router'
import { DragProvider } from '../../hooks/contexts/drag-context/UseDragContext'
import { Box } from '@chakra-ui/react'

const XlsxHomePage: React.FC = () => {
  return (
    <>
      <DragProvider>
        <Box>
          <p>App Version: {import.meta.env.VITE_IS_PLAN_TRIP}</p>
        </Box>
        <Outlet />
      </DragProvider>
    </>
  )
}

export default XlsxHomePage
