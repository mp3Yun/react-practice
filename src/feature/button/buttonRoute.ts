import { createRoute } from '@tanstack/react-router'
import { RoutePathEnum, routePathMaps } from '../../dto/route-paths'
import { homeRoute } from '../home/homeRoute'

// 創建路由，從當下的父節點開始看，path 使用相對路徑
export const buttonRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/button', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.Button].component, // 定義該路由的對應組件
})

// Button id route
export const buttonIdRoute = createRoute({
  getParentRoute: () => buttonRoute,
  path: '$postId', // 定義路由的 path
  // loader: ({ params }) => fetchPost(params.postId), // 這邊可以順邊就去發 API，發完再載入頁面
  component: routePathMaps[RoutePathEnum.ButtonId].component, // 定義該路由的對應組件
})

// Button detail route
export const buttonDetailRoute = createRoute({
  getParentRoute: () => buttonRoute,
  path: '/detail', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.ButtonDetail].component, // 定義該路由的對應組件
})

export const buttonRouteTree = buttonRoute.addChildren([
  buttonIdRoute,
  buttonDetailRoute,
])
