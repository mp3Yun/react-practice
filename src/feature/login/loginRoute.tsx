import { createRoute } from '@tanstack/react-router'
import { Route } from '../../routes/__root'
import { RoutePathEnum, routePathMaps } from '../../dto/route-paths'

// 創建路由
export const loginRoute = createRoute({
  getParentRoute: () => Route,
  path: RoutePathEnum.Login, // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Login].component, // 定義該路由的對應組件
})
