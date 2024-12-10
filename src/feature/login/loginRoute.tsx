import { createRoute } from '@tanstack/react-router'
import LoginPage from './LoginPage'
import { rootRoute } from '../../routes/routes'

// 創建路由
export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/', // 定義路由的 path
  component: LoginPage, // 定義該路由的對應組件
})
