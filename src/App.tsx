import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { AuthProvider } from './hooks/AuthContext.tsx'
import { ParagraphStyleProvider } from './hooks/useParagraphStyle.tsx'
import { router } from './routes/routes'
import customTheme from './theme.ts'
import { DirtyFormProvider } from './hooks/DirtyFormContext.tsx'

function App() {
  return (
    <StrictMode>
      <ChakraProvider theme={customTheme}>
        <ParagraphStyleProvider>
          <AuthProvider>
            <DirtyFormProvider>
              <RouterProvider router={router} />
            </DirtyFormProvider>
          </AuthProvider>
        </ParagraphStyleProvider>
      </ChakraProvider>
    </StrictMode>
  )
}

export default App
