import { createRoute } from '@tanstack/react-router'
import App from '../../App'
import { rootRoute } from '../../routes/routes'
import HomePage from './HomePage'

// 創建路由
export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/home', // 定義路由的 path
  component: HomePage, // 定義該路由的對應組件
})
