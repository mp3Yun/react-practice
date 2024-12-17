import { createRoute } from '@tanstack/react-router'
import { homeRoute } from '../home/homeRoute'
import { RoutePathEnum, routePathMaps } from '../../dto/route-paths'

export const videoRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/video', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Video].component, // 定義該路由的對應組件
})
