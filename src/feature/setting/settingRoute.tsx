import { createRoute } from '@tanstack/react-router'
import { homeRoute } from '../home/homeRoute'
import { routePathMaps, RoutePathEnum } from '../../dto/route-paths'

export const settingRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/setting', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Setting].component, // 定義該路由的對應組件
})
