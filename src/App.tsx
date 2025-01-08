import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { AuthProvider } from './hooks/AuthContext.tsx'
import { ParagraphStyleProvider } from './hooks/useParagraphStyle.tsx'
import { router } from './routes/routes'
import system from './theme.ts'

function App() {
  return (
    <StrictMode>
      <ChakraProvider value={system}>
        <ParagraphStyleProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </ParagraphStyleProvider>
      </ChakraProvider>
    </StrictMode>
  )
}

export default App
