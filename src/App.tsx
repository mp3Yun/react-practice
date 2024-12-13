import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes/routes'
import customTheme from './theme.ts'
import { StrictMode } from 'react'
import { ParagraphStyleProvider } from './hooks/useParagraphStyle.tsx'

function App() {
  return (
    <StrictMode>
      <ChakraProvider theme={customTheme}>
        <ParagraphStyleProvider>
          <RouterProvider router={router} />
        </ParagraphStyleProvider>
      </ChakraProvider>
    </StrictMode>
  )
}

export default App
