import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from '@tanstack/react-router'
import React, { StrictMode } from 'react'
import { AuthProvider } from './hooks/AuthContext.tsx'
import { LoadingProvider } from './hooks/LoadingContext.tsx'
import { OverlayVisibleProvider } from './hooks/OverlayVisibleContext.tsx'
import { StoreProvider } from './hooks/contexts/store-context/UseStore.tsx'
import { ParagraphStyleProvider } from './hooks/useParagraphStyle.tsx'
import './i18n' // 引入 i18n 設定檔
import { router } from './routes/routes'
import system from './theme.ts'

function App() {
  return (
    <StrictMode>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ChakraProvider value={system}>
          <LoadingProvider>
            <OverlayVisibleProvider>
              <ParagraphStyleProvider>
                <AuthProvider>
                  <StoreProvider>
                    <RouterProvider router={router} />
                  </StoreProvider>
                </AuthProvider>
              </ParagraphStyleProvider>
            </OverlayVisibleProvider>
          </LoadingProvider>
        </ChakraProvider>
      </React.Suspense>
    </StrictMode>
  )
}

export default App
