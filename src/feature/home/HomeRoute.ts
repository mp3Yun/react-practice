import { createRoute } from '@tanstack/react-router'
import { RoutePathEnum, routePathMaps } from '../../dto/route-paths'
import { Route } from '../../routes/__root'
import { buttonRouteTree } from '../button/buttonRoute'
import { mainRoute } from '../main/mainRoute'

// 創建路由
export const homeRoute = createRoute({
  getParentRoute: () => Route,
  path: RoutePathEnum.Home, // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Home].component, // 定義該路由的對應組件
})

// 建立路由樹
export const homeRouteTree = homeRoute.addChildren([mainRoute, buttonRouteTree])
