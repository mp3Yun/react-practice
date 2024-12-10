import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'
import App from '../App'
import { homeRoute } from '../feature/home/HomeRoute'
import { buttonRoute } from '../feature/button/buttonRoute'

export const rootRoute = createRootRoute({
  component: Outlet,
})

// 創建 app 路由
export const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/', // 定義路由的 path
  component: App, // 定義該路由的對應組件
})

// 建立路由樹
const routeTree = rootRoute.addChildren([appRoute, homeRoute, buttonRoute])

const router = createRouter({ routeTree })

export { router, routeTree }
