import { createRoute } from '@tanstack/react-router'
import { RoutePathEnum, routePathMaps } from '../../dto/route-paths'
import { homeRoute } from '../home/homeRoute'

export const chartRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/chart', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Chart].component, // 定義該路由的對應組件
})
