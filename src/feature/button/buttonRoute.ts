import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../../routes/routes'
import ButtonPage from './ButtonPage'

// 創建路由
export const buttonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/button', // 定義路由的 path
  component: ButtonPage, // 定義該路由的對應組件
})
