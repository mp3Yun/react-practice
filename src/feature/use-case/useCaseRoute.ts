import { createRoute } from '@tanstack/react-router'
import { homeRoute } from '../home/homeRoute'
import { RoutePathEnum, routePathMaps } from '../../dto/route-paths'

export const useCaseRoute = createRoute({
  getParentRoute: () => homeRoute,
  path: '/useCase', // 定義路由的 path
  component: routePathMaps[RoutePathEnum.UseCase].component, // 定義該路由的對應組件
})

export const useCaseRouteTree = useCaseRoute.addChildren([])
