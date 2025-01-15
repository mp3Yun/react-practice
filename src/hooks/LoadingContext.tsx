import { Box, Spinner } from '@chakra-ui/react'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface LoadingContextProps {
  isLoading: boolean
  setIsLoading: (status: boolean) => void
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined)

export const LoadingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

  // 邏輯層請抽出到 hook 中處理
  // const showLoading = () => setIsLoading(true)
  // const hideLoading = () => setIsLoading(false)

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          bg="gray.300"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex="modal"
        >
          <Spinner size="xl" color="white" />
        </Box>
      )}
    </LoadingContext.Provider>
  )
}

// 自定義 Hook useLoading 來取得 LoadingContext 與邏輯操作
export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }

  // 邏輯層處理
  const showLoading = () => context.setIsLoading(true)
  const hideLoading = () => context.setIsLoading(false)

  return { isLoading: context.isLoading, showLoading, hideLoading }
}
