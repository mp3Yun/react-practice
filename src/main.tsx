import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import { router } from './routes/routes.ts'
import customTheme from './theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={customTheme}>
    <RouterProvider router={router} />
  </ChakraProvider>
)
