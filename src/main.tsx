import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import DemoHome from './components/demo/DemoHome.tsx'
import './index.css'
import IconDemo from './components/demo/IconDemo.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      /**
       * Demo module
       * If it's as sub module,
       * In this case, you should add <Outlet /> in DemoHome.
       */
      {
        path: '/Demo',
        element: <DemoHome />,
        children: [
          {
            path: 'IconDemo',
            element: <IconDemo />,
          },
          {
            path: 'ButtonDemo',
            element: <IconDemo />,
          },
        ],
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
