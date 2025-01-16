import { createRoute } from '@tanstack/react-router'
import { homeRoute } from '../home/homeRoute'
import { RoutePathEnum, routePathMaps } from '../../dto/route-paths'

export const chineseCabbageRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/chineseCabbage', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.ChineseCabbage].component, // 定義該路由的對應組件
})
