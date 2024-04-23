import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import IconDemo from './components/demo/IconDemo.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/iconDemo',
        element: <IconDemo />,
      },
      {
        path: '/buttonDemo',
        element: <IconDemo />,
      },
    ],
  },
  {
    path: '/second',
    element: <div>root level page</div>,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
