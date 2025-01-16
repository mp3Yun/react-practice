import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface OverlayVisibleContextProps {
  isOverlayVisible: boolean
  setIsOverlayVisible: (status: boolean) => void
}

const OverlayVisibleContext = createContext<
  OverlayVisibleContextProps | undefined
>(undefined)

export const OverlayVisibleProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  return (
    <OverlayVisibleContext.Provider
      value={{ isOverlayVisible, setIsOverlayVisible }}
    >
      {children}
    </OverlayVisibleContext.Provider>
  )
}

export const useOverlayVisible = () => {
  const context = useContext(OverlayVisibleContext)
  if (context === undefined) {
    throw new Error(
      'useOverlayVisible must be used within a OverlayVisibleProvider'
    )
  }
  // 邏輯層處理
  const showOverlay = () => context.setIsOverlayVisible(true)
  const hideOverlay = () => context.setIsOverlayVisible(false)
  return {
    isOverlayVisible: context.isOverlayVisible,
    showOverlay,
    hideOverlay,
  }
}
