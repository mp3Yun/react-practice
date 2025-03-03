import { createRoute } from '@tanstack/react-router'
import { homeRoute } from '../home/homeRoute'
import { RoutePathEnum, routePathMaps } from '../../dto/route-paths'

export const xlsxRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/xlsx', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Xlsx].component, // 定義該路由的對應組件
})

export const toursRoute = createRoute({
  getParentRoute: () => xlsxRoute,
  path: '/tours', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Tours].component, // 定義該路由的對應組件
})

export const hotelsRoute = createRoute({
  getParentRoute: () => xlsxRoute,
  path: '/hotels', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Tours].component, // 定義該路由的對應組件
})

export const schedulesRoute = createRoute({
  getParentRoute: () => xlsxRoute,
  path: '/schedules', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Schedules].component, // 定義該路由的對應組件
})

export const xlsxRouteTree = xlsxRoute.addChildren([
  toursRoute,
  hotelsRoute,
  schedulesRoute,
])
