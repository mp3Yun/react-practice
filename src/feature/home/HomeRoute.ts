import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../../routes/routes'
import HomePage from './HomePage'
import { buttonRoute } from '../button/buttonRoute'

// 創建路由
export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/home', // 定義路由的 path
  component: HomePage, // 定義該路由的對應組件
})

// 建立路由樹
export const homeRouteTree = homeRoute.addChildren([buttonRoute])
