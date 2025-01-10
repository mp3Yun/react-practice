import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from '@tanstack/react-router'
import React, { StrictMode } from 'react'
import { AuthProvider } from './hooks/AuthContext.tsx'
import { ParagraphStyleProvider } from './hooks/useParagraphStyle.tsx'
import './i18n' // 引入 i18n 設定檔
import { router } from './routes/routes'
import system from './theme.ts'

function App() {
  return (
    <StrictMode>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ChakraProvider value={system}>
          <ParagraphStyleProvider>
            <AuthProvider>
              <RouterProvider router={router} />
            </AuthProvider>
          </ParagraphStyleProvider>
        </ChakraProvider>
      </React.Suspense>
    </StrictMode>
  )
}

export default App
