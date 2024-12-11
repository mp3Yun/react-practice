import { createRoute } from '@tanstack/react-router'
import { RoutePathEnum, routePathMaps } from '../../dto/route-paths'
import { homeRoute } from '../home/homeRoute'

// 創建路由
export const buttonRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/button', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Button].component, // 定義該路由的對應組件
})

// Button detail route
export const buttonDetailRoute = createRoute({
  getParentRoute: () => buttonRoute,
  path: '/detail', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.ButtonDetail].component, // 定義該路由的對應組件
})

export const buttonRouteTree = buttonRoute.addChildren([buttonDetailRoute])
