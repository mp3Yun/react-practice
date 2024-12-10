import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes/routes'
import customTheme from './theme.ts'

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  )
}

export default App
