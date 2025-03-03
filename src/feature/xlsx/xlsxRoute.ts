import { createRoute } from '@tanstack/react-router'
import { RoutePathEnum, routePathMaps } from '../../dto/route-paths'
import { homeRoute } from '../home/homeRoute'

export const xlsxRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/xlsx', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Xlsx].component, // 定義該路由的對應組件
})

export const spotsRoute = createRoute({
  getParentRoute: () => xlsxRoute,
  path: '/spots', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Spots].component, // 定義該路由的對應組件
})

export const hotelsRoute = createRoute({
  getParentRoute: () => xlsxRoute,
  path: '/hotels', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Hotels].component, // 定義該路由的對應組件
})

export const schedulesRoute = createRoute({
  getParentRoute: () => xlsxRoute,
  path: '/schedules', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Schedules].component, // 定義該路由的對應組件
})

export const xlsxRouteTree = xlsxRoute.addChildren([
  spotsRoute,
  hotelsRoute,
  schedulesRoute,
])
