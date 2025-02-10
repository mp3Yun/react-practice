import { createRoute } from '@tanstack/react-router'
import { homeRoute } from '../home/homeRoute'
import { RoutePathEnum, routePathMaps } from '../../dto/route-paths'

export const xlsxRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/xlsx', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Xlsx].component, // 定義該路由的對應組件
})
