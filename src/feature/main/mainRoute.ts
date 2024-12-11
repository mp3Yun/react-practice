import { RoutePathEnum, routePathMaps } from '../../dto/route-paths'
import { homeRoute } from '../home/homeRoute'
import { createRoute } from '@tanstack/react-router'

// 創建路由
export const mainRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Main].component, // 定義該路由的對應組件
})
