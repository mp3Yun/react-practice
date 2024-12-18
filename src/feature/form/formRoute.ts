import { createRoute } from '@tanstack/react-router'
import { routePathMaps, RoutePathEnum } from '../../dto/route-paths'
import { homeRoute } from '../home/homeRoute'

export const formRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/form', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Form].component, // 定義該路由的對應組件
})
