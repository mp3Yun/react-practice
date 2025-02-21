import { Outlet } from '@tanstack/react-router'
import { DragProvider } from '../../hooks/contexts/drag-context/UseDragContext'

const XlsxHomePage: React.FC = () => {
  return (
    <>
      <DragProvider>
        <Outlet />
      </DragProvider>
    </>
  )
}

export default XlsxHomePage
